import { EventDto } from "@/features/events/infrastructure/dto/event.dto";
import { apiClient } from "@/lib/api/client";

export const eventApi = {
  async getEventsUpcoming({ limit }: { limit?: number }) {
    const response = await apiClient.get<EventDto[]>({
      url: "/events/upcoming",
      ...(limit && { query: `limit=${limit}` }),
    });
    return response;
  },
};
