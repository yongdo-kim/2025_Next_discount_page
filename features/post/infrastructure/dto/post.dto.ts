import { tagResponseSchema } from "@/features/tag/infrastructure/dto/tag.dto";
import { userResponseSchema } from "@/features/user/infrastructure/dto/user.dto";
import { z } from "zod";
import { PostEntity } from "../../domain/entities/post.entity";

export const postResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string(),
  user: userResponseSchema,
  tags: z.array(tagResponseSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

//dto
export type PostDto = z.infer<typeof postResponseSchema>;

export function toEntity(dto: PostDto): PostEntity {
  return new PostEntity({
    id: dto.id,
    title: dto.title,
    content: dto.content,
    imageUrl: dto.imageUrl,
    user: userResponseSchema.parse(dto.user),
    tags: dto.tags.map((tag) => tagResponseSchema.parse(tag)),
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  });
}
