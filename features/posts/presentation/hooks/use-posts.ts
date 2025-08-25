"use client";

import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { postKeys } from "@/features/posts/infrastructure/contstant/query-keys";
import { PostPreviewsReqDto } from "@/features/posts/infrastructure/dto/requests/post-preview.req.dto";
import { container } from "@/lib/di/dependencies";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const usePostPreviews = ({
  req,
  enabled,
}: {
  req: PostPreviewsReqDto;
  enabled?: boolean;
}) => {
  return useQuery<PostPreviewEntity[]>({
    queryKey: [categoryKeys.postPreviews(req.categoryId, req.limit)],
    queryFn: () => {
      return container.postService.getPostPreviews({
        req,
      });
    },

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
  });
};

export const useInfinitePostPreviews = ({
  categoryId,
  limit = 10,
}: {
  categoryId?: number | null;
  limit?: number;
}) => {
  return useInfiniteQuery({
    queryKey: [categoryKeys.infinite, categoryId, limit],
    queryFn: ({ pageParam }) =>
      container.postService.getPostPreviews({
        req: {
          categoryId: categoryId || null,
          limit,
          cursor: pageParam, // 첫 페이지는 undefined, 다음 페이지부터는 마지막 아이템의 ID
        },
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      // 마지막 페이지 데이터가 limit보다 적으면 더 이상 데이터가 없음
      if (lastPage.length < limit) return undefined;
      // 마지막 아이템의 ID를 다음 페이지의 커서로 사용
      return lastPage[lastPage.length - 1]?.id;
    },
  });
};
