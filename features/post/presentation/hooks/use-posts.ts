"use client";

import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { PostCategory } from "../../domain/types";
import { postKeys } from "../../infrastructure/contstant/query-keys";
import { PostEntity } from "../../domain/entities/post.entity";

export const usePostPreviews = ({ category }: { category?: string }) => {
  return useQuery<PostPreviewEntity[]>({
    queryKey: [postKeys.all, category],
    queryFn: () =>
      container.postService.getPostPreviews({
        category: category as PostCategory,
      }),
    throwOnError: true, //에러바운더리에 연락
  });
};

export const usePostDetail = ({
  id,
  initialPost,
}: {
  id: number;
  initialPost?: PostEntity;
}) => {
  return useQuery<PostEntity>({
    queryKey: [postKeys.detail(id)],
    queryFn: () => {
      return container.postService.getPostDetail(id);
    },
    initialData: initialPost,
    throwOnError: true, //에러바운더리에 연락
  });
};
