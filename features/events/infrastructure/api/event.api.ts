import { EventDto } from "@/features/events/infrastructure/dto/event.dto";
import { PostDto } from "@/features/posts/infrastructure/dto/responses/post.res.dto";
import { apiClient } from "@/lib/api/client";

export const eventApi = {
  async getEventsUpcoming({ limit }: { limit?: number }) {
    const response = await apiClient.get<EventDto[]>({
      url: "/events/upcoming",
      ...(limit && { query: `limit=${limit}` }),
    });
    return response;
  },

  async getEventDetail(id: number) {
    const response = await apiClient.get<PostDto>({
      url: `/events/${id}/detail`,
    });
    return response;
  },
};
