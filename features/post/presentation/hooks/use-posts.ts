'use client';

import { DIContainer } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { PostEntity } from "../../domain/entities/post.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export const usePosts = (initialData?: PostEntity[]) => {
  return useQuery<PostEntity[]>({
    queryKey: [postKeys.all],
    queryFn: DIContainer.postService.getPostList,
    throwOnError: true, //에러바운더리에 연락
    initialData,
  });
};


