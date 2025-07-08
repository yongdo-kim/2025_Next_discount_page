"use client";

import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { TagEntity } from "../../domain/entities/tag.entity";
import { tagKeys } from "../../infrastructure/contstant/query-keys";

export const useFetchTags = () => {
  return useQuery<TagEntity[]>({
    queryKey: [tagKeys.all],
    queryFn: () => container.tagService.getTags(),
    throwOnError: true, //에러바운더리에 연락
  });
};
