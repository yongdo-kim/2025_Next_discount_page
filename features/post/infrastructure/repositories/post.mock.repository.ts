import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";

export class MockPostRepository implements PostRepository {
  //임시로 작업중.
  private mockPosts: PostEntity[] = [
    new PostEntity({
      id: "1",
      title: "테스트 포스트 1",
      content: "이것은 테스트용 포스트입니다.",
      authorId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    new PostEntity({
      id: "2",
      title: "테스트 포스트 2",
      content: "또 다른 테스트 포스트입니다.",
      authorId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];

  async getPostList(path: string, query?: string): Promise<PostEntity[]> {
    // 간단한 검색 기능 구현 (선택사항)
    if (query) {
      const searchTerm = query.toLowerCase();
      return this.mockPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm)
      );
    }
    return this.mockPosts;
  }
}
