import { EventEntity } from "@/features/events/domain/entities/event.entity";

export interface EventRepository {
  getEventsUpcoming(limit?: number): Promise<EventEntity[]>;
  getEventsLatest(limit?: number): Promise<EventEntity[]>;
}
