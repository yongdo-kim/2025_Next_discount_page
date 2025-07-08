import { categoryResponseSchema } from "@/features/categories/infrastructure/dto/category.dto";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { tagResponseSchema } from "@/features/tags/infrastructure/dto/tag.dto";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { z } from "zod";
import { userDtoSchema } from "./post.res.dto";

export const postPreviewResSchema = z.object({
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
  thumbnailUrl: z.string().optional(),
  tags: tagResponseSchema.array(),
  category: categoryResponseSchema,
});

//dto
export type PostPreviewDto = z.infer<typeof postPreviewResSchema>;

export function toPostPreviewEntity(dto: PostPreviewDto): PostPreviewEntity {
  return new PostPreviewEntity({
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
    tags: dto.tags.map((tag) => new TagEntity({ id: tag.id, name: tag.name })),
    thumbnailUrl: dto.thumbnailUrl || "",
    category: dto.category,
  });
}
