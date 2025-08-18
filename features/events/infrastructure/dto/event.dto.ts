import { z } from "zod";
import { EventEntity } from "@/features/events/domain/entities/event.entity";

export const eventResponseSchema = z.object({
  postId: z.number(),
  eventId: z.number(),
  title: z.string(),
  prize: z.string(),
  winners: z.string(),
  endDate: z.string().transform((str) => new Date(str)),
  link: z.string(),
  originSourceUrl: z.string(),
});

export type EventDto = z.infer<typeof eventResponseSchema>;

export function toEntity(dto: EventDto): EventEntity {
  return new EventEntity({
    postId: dto.postId,
    eventId: dto.eventId,
    title: dto.title,
    prize: dto.prize,
    winners: dto.winners,
    endDate: dto.endDate,
    link: dto.link,
    originSourceUrl: dto.originSourceUrl,
  });
}
