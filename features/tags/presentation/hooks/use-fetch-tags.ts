"use client";

import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { tagKeys } from "@/features/tags/infrastructure/contstant/query-keys";

export const useFetchTags = () => {
  return useQuery<TagEntity[]>({
    queryKey: [tagKeys.all],
    queryFn: () => container.tagService.getTags(),
  });
};
