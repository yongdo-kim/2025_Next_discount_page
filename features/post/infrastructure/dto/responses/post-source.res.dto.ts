import { PostSourceEntity } from "@/features/post/domain/entities/post-source.entity";
import z from "zod";

export const postSourceResSchema = z.object({
  scrapingSourceUrl: z.string(),
  originSourceUrl: z.string().optional().nullable(),
});

//dto
export type PostSourceResDto = z.infer<typeof postSourceResSchema>;

export function toPostSourceEntity(dto: PostSourceResDto): PostSourceEntity {
  return new PostSourceEntity({
    scrapingSourceUrl: dto.scrapingSourceUrl,
    originSourceUrl: dto.originSourceUrl,
  });
}
