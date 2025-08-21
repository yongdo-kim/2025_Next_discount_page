import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { EventRepository } from "@/features/events/domain/repositories/event.repository";

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async getEventsUpcoming(limit?: number): Promise<EventEntity[]> {
    const events = await this.eventRepository.getEventsUpcoming(limit);

    // Filter out duplicates based on title
    const uniqueEvents = events.filter(
      (event, index, array) =>
        array.findIndex((e) => e.title === event.title) === index,
    );

    // Sort by endDate closest to current date
    const currentDate = new Date();
    const sortedEvents = uniqueEvents.sort((a, b) => {
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);
      const diffA = Math.abs(dateA.getTime() - currentDate.getTime());
      const diffB = Math.abs(dateB.getTime() - currentDate.getTime());
      return diffA - diffB;
    });

    return sortedEvents;
  }

  async getEventsLatest(limit?: number): Promise<EventEntity[]> {
    const events = await this.eventRepository.getEventsLatest(limit);
    return events;
  }
}
