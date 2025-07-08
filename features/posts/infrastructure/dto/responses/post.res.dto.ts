import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { tagResponseSchema } from "@/features/tags/infrastructure/dto/tag.dto";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { z } from "zod";
import { PostEntity } from "../../../domain/entities/post.entity";
import { postSourceResSchema } from "./post-source.res.dto";

export const userDtoSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  picture: z.string(),
});

export const postResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  author: userDtoSchema,
  createdAt: z.string(),
  viewsCount: z.number(),
  likesCount: z.number(),
  isLikedByMe: z.boolean(),
  isReportedByMe: z.boolean(),
  commentsCount: z.number(),
  imageUrl: z.string(),
  tags: tagResponseSchema.array(),
  source: postSourceResSchema,
});

//dto
export type PostsResponse = z.infer<typeof postResponseSchema>[];
export type PostResponse = z.infer<typeof postResponseSchema>;
export type PostDto = z.infer<typeof postResponseSchema>;

export function toPostEntity(dto: PostDto): PostEntity {
  return new PostEntity({
    id: dto.id,
    title: dto.title,
    content: dto.content,
    author: new UserEntity({
      id: dto.author.id,
      email: "",
      nickname: dto.author.nickname,
      name: "",
      picture: dto.author.picture,
      provider: "",
      role: "",
      apple_user_identifier: undefined,
    }),
    createdAt: dto.createdAt,
    updatedAt: null, // 기본값
    deletedAt: null, // 기본값
    viewsCount: dto.viewsCount,
    likesCount: dto.likesCount,
    isLikedByMe: dto.isLikedByMe,
    isMine: false, // 기본값
    isReportedByMe: dto.isReportedByMe,
    isBlurredByAI: false, // 기본값
    isBlockedByMe: false, // 기본값
    commentsCount: dto.commentsCount,
    imageUrl: dto.imageUrl,
    tags: dto.tags.map((tag) => new TagEntity({ id: tag.id, name: tag.name })),
    source: dto.source,
  });
}
