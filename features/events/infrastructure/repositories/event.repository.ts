import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { EventRepository } from "@/features/events/domain/repositories/event.repository";
import { eventApi } from "@/features/events/infrastructure/api/event.api";

export class HttpEventRepository implements EventRepository {
  async getEventsUpcoming(limit?: number): Promise<EventEntity[]> {
    const events = await eventApi.getEventsUpcoming({ limit });
    return events.map(
      (event) =>
        new EventEntity({
          postId: event.postId,
          eventId: event.eventId,
          title: event.title,
          prize: event.prize,
          winners: event.winners,
          endDate: event.endDate,
          link: event.link,
          originSourceUrl: event.originSourceUrl,
          eventMethod: event.eventMethod,
          ogImage: event.ogImage,
        }),
    );
  }

  async getEventsLatest(limit?: number): Promise<EventEntity[]> {
    const events = await eventApi.getEventsLatest({ limit });
    return events.map(
      (event) =>
        new EventEntity({
          postId: event.postId,
          eventId: event.eventId,
          title: event.title,
          prize: event.prize,
          winners: event.winners,
          endDate: event.endDate,
          link: event.link,
          originSourceUrl: event.originSourceUrl,
          eventMethod: event.eventMethod,
          ogImage: event.ogImage,
        }),
    );
  }
}
