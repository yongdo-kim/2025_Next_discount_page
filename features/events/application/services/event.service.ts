import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { EventRepository } from "@/features/events/domain/repositories/event.repository";

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async getEventsUpcoming(limit?: number): Promise<EventEntity[]> {
    const events = await this.eventRepository.getEventsUpcoming(limit);
    return events;
  }
}
