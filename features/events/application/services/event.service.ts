import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { EventRepository } from "@/features/events/domain/repositories/event.repository";

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async getEvents(query?: string): Promise<EventEntity[]> {
    const events = await this.eventRepository.getEvents(query);
    return events;
  }

  async getActiveEvents(): Promise<EventEntity[]> {
    const events = await this.eventRepository.getActiveEvents();
    return events;
  }

  async getEventsUpcoming(limit?: number): Promise<EventEntity[]> {
    const events = await this.eventRepository.getEventsUpcoming(limit);
    return events;
  }

  async getEventById(id: number): Promise<EventEntity | null> {
    const event = await this.eventRepository.getEventById(id);
    return event;
  }

  async getCurrentEvents(): Promise<EventEntity[]> {
    const activeEvents = await this.eventRepository.getActiveEvents();
    const now = new Date();

    return activeEvents.filter(
      (event) => event.endDate <= now && event.endDate >= now,
    );
  }
}
