import { PostEventEntity } from "@/features/posts/domain/entities/post-event.entity";
import z from "zod";

export const postEventResSchema = z.object({
  organizer: z.string(),
  entryMethod: z.string(),
  winners: z.string(),
  prize: z.string(),
  period: z.string(),
});

//dto
export type PostEventResDto = z.infer<typeof postEventResSchema>;

export function toPostEventEntity(dto: PostEventResDto): PostEventEntity {
  return new PostEventEntity({
    organizer: dto.organizer,
    entryMethod: dto.entryMethod,
    winners: dto.winners,
    prize: dto.prize,
    period: dto.period,
  });
}
