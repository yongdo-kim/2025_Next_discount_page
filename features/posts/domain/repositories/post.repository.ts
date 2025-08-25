import { PostPreviewsReqDto } from "@/features/posts/infrastructure/dto/requests/post-preview.req.dto";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";

export interface PostRepository {
  getPostPreviews({
    req,
  }: {
    req: PostPreviewsReqDto;
  }): Promise<PostPreviewEntity[]>;
  getPostDetail(id: number): Promise<PostEntity>;
  togglePostLike(id: number): Promise<{ isLiked: boolean; likesCount: number }>;
}
