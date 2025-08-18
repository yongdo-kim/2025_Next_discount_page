import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { EventRepository } from "@/features/events/domain/repositories/event.repository";
import { eventApi } from "@/features/events/infrastructure/api/event.api";

export class HttpEventRepository implements EventRepository {
  async getEvents(query?: string): Promise<EventEntity[]> {
    const events = await eventApi.getEvents({ query });
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
        }),
    );
  }

  async getActiveEvents(): Promise<EventEntity[]> {
    const events = await eventApi.getActiveEvents();
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
        }),
    );
  }

  async getEventById(id: number): Promise<EventEntity | null> {
    try {
      const event = await eventApi.getEventById(id);
      return new EventEntity({
        postId: event.postId,
        eventId: event.eventId,
        title: event.title,
        prize: event.prize,
        winners: event.winners,
        endDate: event.endDate,
        link: event.link,
        originSourceUrl: event.originSourceUrl,
      });
    } catch {
      return null;
    }
  }
}
