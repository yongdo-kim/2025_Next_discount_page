"use client";

import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { eventKeys } from "@/features/events/infrastructure/constant/query-keys";

export const useFetchEvents = (query?: string) => {
  return useQuery<EventEntity[]>({
    queryKey: eventKeys.list(query),
    queryFn: () => container.eventService.getEvents(query),
  });
};

export const useFetchActiveEvents = () => {
  return useQuery<EventEntity[]>({
    queryKey: eventKeys.active,
    queryFn: () => container.eventService.getActiveEvents(),
  });
};

export const useFetchEventById = (id: number) => {
  return useQuery<EventEntity | null>({
    queryKey: eventKeys.detail(id),
    queryFn: () => container.eventService.getEventById(id),
    enabled: !!id,
  });
};
