import { EventEntity } from "@/features/events/domain/entities/event.entity";

export interface EventRepository {
  getEvents(query?: string): Promise<EventEntity[]>;
  getActiveEvents(): Promise<EventEntity[]>;
  getEventById(id: number): Promise<EventEntity | null>;
  getEventsUpcoming(limit?: number): Promise<EventEntity[]>;
}
