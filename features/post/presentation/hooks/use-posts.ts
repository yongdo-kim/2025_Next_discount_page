"use client";

import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { PostEntity } from "../../domain/entities/post.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export const usePosts = (category?: string, limit?: number) => {
  return useQuery<PostEntity[]>({
    queryKey: [postKeys.all, category],
    queryFn: () => container.postService.getPostList(category, limit),
    throwOnError: true, //에러바운더리에 연락
  });
};

export const usePostDetail = ({
  id,
  initialPost,
}: {
  id: string;
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
