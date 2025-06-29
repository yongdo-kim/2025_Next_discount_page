import { TagEntity } from "@/features/tag/domain/entities/tag.entity";
import { UserEntity } from "@/features/user/domain/entities/user.entity";
import { GetPostPreviewsReqDto } from "@/features/user/infrastructure/dto/requests/post-preview.req.dto";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";

export class MockPostRepository implements PostRepository {
  //임시로 작업중.
  private mockPosts: PostEntity[] = [];
  private mockPostPreviews: PostPreviewEntity[] = [];

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
      `
      이 글은 더미 아티클입니다.
    
      1장: 시작
      오늘은 정말로 많은 일이 있었습니다. 아침에 일어나자마자 커피를 한 잔 내리고, 창밖을 바라보며 하루를 시작했습니다. 햇살이 참 따뜻했어요.
    
      2장: 점심시간
      점심에는 동료들과 함께 근처 맛집에 갔습니다. 정말 맛있는 음식을 먹으면서 이런저런 이야기를 나누었죠.
    
      3장: 오후 시간
      오후에는 집중해서 코딩을 했습니다. 새로운 기능을 개발하다 보니 시간 가는 줄 몰랐습니다.
    
      4장: 퇴근길
      퇴근길에는 이어폰을 끼고 좋아하는 음악을 들으며 천천히 걸었습니다.
    
      5장: 마무리
      집에 도착해서는 가볍게 운동도 하고, 저녁을 먹었습니다. 그리고 이렇게 긴 더미 텍스트를 작성하고 있습니다.
    
      (여기에 빈 줄 여러 개, 반복 문장 등 추가)
      `.repeat(5),
    ];
    const images = [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400",
    ];
    const users = [
      new UserEntity({
        id: 1,
        nickname: "홍길동",
        name: "홍길동",
        picture: "https://randomuser.me/api/portraits/men/1.jpg",
        provider: "local",
        role: "user",
        email: "",
      }),
      new UserEntity({
        id: 2,
        nickname: "김개발",
        name: "김개발",
        picture: "https://randomuser.me/api/portraits/men/2.jpg",
        provider: "local",
        role: "user",
        email: "",
      }),
      new UserEntity({
        id: 3,
        nickname: "이디자이너",
        name: "이디자이너",
        picture: "https://randomuser.me/api/portraits/women/1.jpg",
        provider: "local",
        role: "user",
        email: "",
      }),
      new UserEntity({
        id: 4,
        nickname: "박테스터",
        name: "박테스터",
        picture: "https://randomuser.me/api/portraits/women/2.jpg",
        provider: "local",
        role: "user",
        email: "",
      }),
    ];
    const tags = [
      new TagEntity({ id: 1, name: "점심" }),
      new TagEntity({ id: 2, name: "저녁" }),
      new TagEntity({ id: 3, name: "개발" }),
      new TagEntity({ id: 4, name: "일상" }),
      new TagEntity({ id: 5, name: "카페" }),
      new TagEntity({ id: 6, name: "스터디" }),
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
        now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000,
      );

      result.push(
        new PostEntity({
          id: i + 3,
          title,
          content,
          imageUrl,
          author: user,
          commentsCount: 0,
          createdAt: randomPast.toISOString(),
          updatedAt: randomPast.toISOString(),
          deletedAt: null,
          viewsCount: 0,
          likesCount: 0,
          isLikedByMe: false,
          isReportedByMe: false,
          isBlurredByAI: false,
          isBlockedByMe: false,
          isMine: false,
          tags: postTags,
          source: {
            scrapingSourceUrl: "https://naver.com",
            originSourceUrl: "https://naver.com",
          },
        }),
      );
    }
    return result;
  }

  async getPostPreviews({
    req,
  }: {
    req: GetPostPreviewsReqDto;
  }): Promise<PostPreviewEntity[]> {
    // 간단한 검색 기능 구현 (선택사항)
    if (req.categoryId) {
      return this.mockPostPreviews.filter(
        (post) => post.category.id === req.categoryId,
      );
    }
    console.log(this.mockPosts);
    return this.mockPostPreviews;
  }

  async getPostDetail(id: number): Promise<PostEntity> {
    const post = this.mockPosts.find((post) => post.id === id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }
}
