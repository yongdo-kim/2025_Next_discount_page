"use client";

import { useOptimistic, useTransition } from "react";
import { container } from "@/lib/di/dependencies";

export const usePostLike = (postId: number, initialLiked: boolean) => {
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    initialLiked,
    (_, newValue: boolean) => newValue,
  );
  const [isPending, startTransition] = useTransition();

  const toggleLike = async () => {
    console.log(
      "current isLiked:",
      optimisticLiked,
      "toggling to:",
      !optimisticLiked,
    );

    startTransition(async () => {
      setOptimisticLiked(!optimisticLiked);

      try {
        const result = await container.postService.togglePostLike(postId);
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
