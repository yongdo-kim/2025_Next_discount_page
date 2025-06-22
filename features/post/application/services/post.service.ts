import { PostRepository } from "../../domain/repositories/post.repository";

//복수의 useCase 추가 가능
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async getPostList() {
    const result = await this.postRepository.getPostList("/posts");
    return result;
  }
}
