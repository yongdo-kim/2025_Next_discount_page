import { z } from "zod";
import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";

export const categoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

//dto
export type CategoryDto = z.infer<typeof categoryResponseSchema>;

export function toEntity(dto: CategoryDto): CategoryEntity {
  return new CategoryEntity({
    id: dto.id,
    name: dto.name,
  });
}
