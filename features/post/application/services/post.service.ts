import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";
import { PostCategory } from "../../domain/types";

//복수의 useCase 추가 가능
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async getPostPreviews({
    category,
  }: {
    category?: PostCategory;
  }): Promise<PostPreviewEntity[]> {
    const posts = await this.postRepository.getPostPreviews({
      category,
    });
    return posts;
  }
  async getPostDetail(id: number): Promise<PostEntity> {
    const post = await this.postRepository.getPostDetail(id);
    return post;
  }
}
