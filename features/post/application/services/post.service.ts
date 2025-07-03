import { GetPostPreviewsReqDto } from "@/features/user/infrastructure/dto/requests/post-preview.req.dto";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";

//복수의 useCase 추가 가능
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async getPostPreviews({
    req,
  }: {
    req: GetPostPreviewsReqDto;
  }): Promise<PostPreviewEntity[]> {
    const posts = await this.postRepository.getPostPreviews({
      req,
    });
    return posts;
  }
  async getPostDetail(id: number): Promise<PostEntity> {
    const post = await this.postRepository.getPostDetail(id);
    return post;
  }
  async getCategoryPostPreviews(): Promise<PostPreviewEntity[]> {
    const post = await this.postRepository.getCategoryPostPreviews();
    return post;
  }
}
