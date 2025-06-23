import { userResponseSchema } from "@/features/user/infrastructure/dto/user.dto";
import { z } from "zod";
import { PostEntity } from "../../domain/entities/post.entity";

export const postResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string(),
  user: userResponseSchema,
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
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  });
}
