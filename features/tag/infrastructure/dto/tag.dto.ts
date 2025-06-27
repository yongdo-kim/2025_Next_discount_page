import { z } from "zod";
import { TagEntity } from "../../domain/entities/post.entity";

export const tagResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

//dto
export type TagDto = z.infer<typeof tagResponseSchema>;

export function toEntity(dto: TagDto): TagEntity {
  return new TagEntity({
    id: dto.id,
    name: dto.name,
  });
}
