import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { EventRepository } from "@/features/events/domain/repositories/event.repository";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async getEventsUpcoming(limit?: number): Promise<EventEntity[]> {
    const events = await this.eventRepository.getEventsUpcoming(limit);
    return events;
  }

  async getEventDetail(id: number): Promise<PostEntity> {
    const event = await this.eventRepository.getEventDetail(id);
    return event;
  }
}
