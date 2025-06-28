"use client";

import { GetPostPreviewsReqDto } from "@/features/user/infrastructure/dto/requests/post-preview.req.dto";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { PostEntity } from "../../domain/entities/post.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export const usePostPreviews = ({ req }: { req: GetPostPreviewsReqDto }) => {
  return useQuery<PostPreviewEntity[]>({
    queryKey: [postKeys.all, req],
    queryFn: () =>
      container.postService.getPostPreviews({
        req,
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
