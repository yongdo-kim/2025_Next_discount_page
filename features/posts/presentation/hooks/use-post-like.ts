"use client";

import { postKeys } from "@/features/posts/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { useOptimistic, useTransition, useEffect } from "react";

export const usePostLike = (postId: number, initialLiked: boolean) => {
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    initialLiked,
    (_, newValue: boolean) => newValue,
  );
  const [isPending, startTransition] = useTransition();

  // props로 받은 initialLiked가 변경되면 optimistic 상태 동기화
  useEffect(() => {
    startTransition(() => {
      setOptimisticLiked(initialLiked);
    });
  }, [initialLiked, setOptimisticLiked, startTransition]);

  const toggleLike = async () => {
    startTransition(async () => {
      setOptimisticLiked(!optimisticLiked);

      try {
        const result = await container.postService.togglePostLike(postId);
        queryClient.invalidateQueries({
          queryKey: [postKeys.detail(postId)],
        });
        console.log(result);
        setOptimisticLiked(result.isLiked);
      } catch (error) {
        console.error("Failed to toggle like:", error);
      }
    });
  };

  return {
    isLiked: optimisticLiked,
    isPending,
    toggleLike,
  };
};
