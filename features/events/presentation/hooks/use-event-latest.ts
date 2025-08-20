"use client";

import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { eventKeys } from "@/features/events/infrastructure/constant/query-keys";

export const useFetchEventsLatest = (limit?: number) => {
  return useQuery<EventEntity[]>({
    queryKey: eventKeys.latest(limit),
    queryFn: () => container.eventService.getEventsLatest(limit),
  });
};
