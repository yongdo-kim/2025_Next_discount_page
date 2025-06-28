import { GetPostPreviewsReqDto } from "@/features/user/infrastructure/dto/requests/post-preview.req.dto";
import { PostPreviewEntity } from "../entities/post-preview.entity";
import { PostEntity } from "../entities/post.entity";

export interface PostRepository {
  getPostPreviews({
    req,
  }: {
    req: GetPostPreviewsReqDto;
  }): Promise<PostPreviewEntity[]>;
  getPostDetail(id: number): Promise<PostEntity>;
}
