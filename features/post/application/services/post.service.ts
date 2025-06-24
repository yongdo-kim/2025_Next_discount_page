import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";

//복수의 useCase 추가 가능
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async getPostList(
    category?: string,
    limit?: number,
    query?: string,
  ): Promise<PostEntity[]> {
    const endpoint = category ? `/posts/${category}` : "/posts";
    const posts = await this.postRepository.getPostList({
      path: endpoint,
      query,
    });
    return posts;
  }
  async getPostDetail(id: string): Promise<PostEntity> {
    const post = await this.postRepository.getPostDetail(id);
    return post;
  }
}
