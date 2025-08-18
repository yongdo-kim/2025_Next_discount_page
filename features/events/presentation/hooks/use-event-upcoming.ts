"use client";

import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { eventKeys } from "@/features/events/infrastructure/constant/query-keys";

export const useFetchEventsUpcoming = (limit?: number) => {
  return useQuery<EventEntity[]>({
    queryKey: eventKeys.upcoming(limit),
    queryFn: () => container.eventService.getEventsUpcoming(limit),
  });
};
