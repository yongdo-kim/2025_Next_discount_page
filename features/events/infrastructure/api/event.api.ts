import { EventDto } from "@/features/events/infrastructure/dto/event.dto";
import { apiClient } from "@/lib/api/client";

export const eventApi = {
  async getEvents({ query }: { query?: string }) {
    const response = await apiClient.get<EventDto[]>({
      url: "/events",
      query,
    });
    return response;
  },

  async getActiveEvents() {
    const response = await apiClient.get<EventDto[]>({
      url: "/events/active",
    });
    return response;
  },

  async getEventById(id: number) {
    const response = await apiClient.get<EventDto>({
      url: `/events/${id}`,
    });
    return response;
  },
};
