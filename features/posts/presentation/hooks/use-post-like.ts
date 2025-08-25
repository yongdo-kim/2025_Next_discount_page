"use client";

import { postKeys } from "@/features/posts/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export const usePostLike = (postId: number, initialLiked: boolean) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  // props로 받은 initialLiked가 변경되면 상태 동기화
  useEffect(() => {
    setIsLiked(initialLiked);
  }, [initialLiked]);

  const mutation = useMutation({
    mutationFn: () => container.postService.togglePostLike(postId),
    onMutate: () => {
      // Optimistic update
      setIsLiked(!isLiked);
    },
    onSuccess: (result) => {
      setIsLiked(result.isLiked);
      queryClient.invalidateQueries({
        queryKey: [postKeys.detail(postId)],
      });
    },
    onError: (error) => {
      // Revert optimistic update
      setIsLiked(isLiked);
      console.error("Failed to toggle like:", error);
    },
  });

  return {
    isLiked,
    isPending: mutation.isPending,
    toggleLike: mutation.mutate,
  };
};
