import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";

export interface EventRepository {
  getEventsUpcoming(limit?: number): Promise<EventEntity[]>;
  getEventDetail(id: number): Promise<PostEntity>;
}
