"use client";

import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { PostEntity } from "../../domain/entities/post.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";
import { PostPreviewsReqDto } from "../../infrastructure/dto/requests/post-preview.req.dto";

//카테코리에 엮여서 전달한다고 판단.
export const usePostPreviews = ({
  req,
  enabled,
}: {
  req: PostPreviewsReqDto;
  enabled?: boolean;
}) => {
  return useQuery<PostPreviewEntity[]>({
    queryKey: [categoryKeys.detail(req.categoryId, req.limit)],
    queryFn: () => {
      return container.postService.getPostPreviews({
        req,
      });
    },
    throwOnError: true, //에러바운더리에 연락
    enabled,
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

export const useCategoryPostPreviews = () => {
  return useQuery<PostPreviewEntity[]>({
    queryKey: [categoryKeys.banners],
    queryFn: () => container.postService.getCategoryPostPreviews(),
    throwOnError: true, //에러바운더리에 연락
  });
};
