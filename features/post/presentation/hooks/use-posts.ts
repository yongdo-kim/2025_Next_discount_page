"use client";

import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { PostEntity } from "../../domain/entities/post.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export const usePosts = () => {
  return useQuery<PostEntity[]>({
    queryKey: [postKeys.all],
    queryFn: () => container.postService.getPostList(),
    throwOnError: true, //에러바운더리에 연락
  });
};
