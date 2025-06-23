import { TagEntity } from "@/features/tag/domain/entities/post.entity";
import { UserEntity } from "@/features/user/domain/entities/user.entity";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";

export class MockPostRepository implements PostRepository {
  //임시로 작업중.
  private mockPosts: PostEntity[] = [];

  constructor() {
    this.mockPosts.push(...this.generateMockPosts(100));
  }

  private generateMockPosts(count: number): PostEntity[] {
    const titles = [
      "오늘의 점심",
      "저녁 메뉴 추천",
      "개발 일기",
      "맛집 후기",
      "스터디 후기",
      "입만 털지 않고 직접 해봤습니다(5일만에 시장검증하기",
      "카페 탐방",
    ];
    const contents = [
      "정말 맛있게 먹었다!",
      "오늘은 새로운 언어를 배웠다.",
      "친구들과 즐거운 시간!",
      "이 집은 꼭 가보세요.",
      "개발이 너무 재밌다.",
      "새로운 취미를 시작했다.",
      "커피가 정말 맛있다.",
    ];
    const images = [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400",
    ];
    const users = [
      new UserEntity({
        id: "u1",
        nickname: "홍길동",
        profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      }),
      new UserEntity({
        id: "u2",
        nickname: "김개발",
        profileImageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
      }),
      new UserEntity({
        id: "u3",
        nickname: "이디자이너",
        profileImageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
      }),
      new UserEntity({
        id: "u4",
        nickname: "박테스터",
        profileImageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      }),
    ];
    const tags = [
      new TagEntity({ id: "1", name: "점심" }),
      new TagEntity({ id: "2", name: "저녁" }),
      new TagEntity({ id: "3", name: "개발" }),
      new TagEntity({ id: "4", name: "일상" }),
      new TagEntity({ id: "5", name: "카페" }),
      new TagEntity({ id: "6", name: "스터디" }),
    ];

    const result: PostEntity[] = [];
    for (let i = 0; i < count; i++) {
      const title =
        titles[Math.floor(Math.random() * titles.length)] + ` #${i + 1}`;
      const content = contents[Math.floor(Math.random() * contents.length)];
      const imageUrl = images[Math.floor(Math.random() * images.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      // 태그는 1~3개 랜덤
      const tagCount = Math.floor(Math.random() * 3) + 1;
      const shuffledTags = tags.sort(() => 0.5 - Math.random());
      const postTags = shuffledTags.slice(0, tagCount);
      // 최근 1년 이내 랜덤 날짜
      const now = new Date();
      const randomPast = new Date(
        now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000
      );

      result.push(
        new PostEntity({
          id: `mock-${i + 3}`,
          title,
          content,
          imageUrl,
          user,
          tags: postTags,
          createdAt: randomPast,
          updatedAt: randomPast,
        })
      );
    }
    return result;
  }

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
    console.log(this.mockPosts);
    return this.mockPosts;
  }

  async getPostDetail(id: string): Promise<PostEntity> {
    const post = this.mockPosts.find((post) => post.id === id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }
}
