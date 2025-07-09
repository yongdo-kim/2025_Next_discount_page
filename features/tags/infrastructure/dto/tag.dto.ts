import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { z } from "zod";

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
