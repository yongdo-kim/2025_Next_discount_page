import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { PostRepository } from "@/features/posts/domain/repositories/post.repository";
import { PostPreviewsReqDto } from "@/features/posts/infrastructure/dto/requests/post-preview.req.dto";
import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { UserEntity } from "@/features/users/domain/entities/user.entity";

export class MockPostRepository implements PostRepository {
  private mockPosts: PostEntity[] = [];
  private mockPostPreviews: PostPreviewEntity[] = [];
  private mockCategoryPostPreviews: PostPreviewEntity[] = [];

  constructor() {
    this.mockPosts.push(...this.generateMockPosts(10));
    this.mockPostPreviews.push(...this.generateMockPostPreviews(500));
    this.mockCategoryPostPreviews.push(
      ...this.generateMockCategoryPostPreviews(100),
    );
  }
  getCategoryPostPreviews(): Promise<PostPreviewEntity[]> {
    // 카테고리별 특별 프로모션 포스트들 (배너용)
    const bannerPosts = this.mockCategoryPostPreviews;
    return Promise.resolve(bannerPosts);
  }
  private generateMockCategoryPostPreviews(count: number): PostPreviewEntity[] {
    const categories = [
      { id: 1, name: "전자제품" },
      { id: 2, name: "의류" },
      { id: 3, name: "음식" },
      { id: 4, name: "도서" },
      { id: 5, name: "생활용품" },
    ];

    const bannerTitles = [
      "🔥 한정 특가! 삼성 갤럭시 최대 할인",
      "⚡ 오늘만! 나이키 운동화 반값 세일",
      "⭐ 스타벅스 원두 할인 + 무료배송",
      "💎 다이슨 청소기 역대급 특가",
      "🎯 애플 아이폰 최저가 보장",
      "🛍️ 유니클로 전 상품 30% 할인",
      "📚 교보문고 베스트셀러 50% 세일",
      "🏠 생활용품 대전 최대 70% 할인",
      "⌚ 갤럭시 워치 런칭 기념 특가",
      "👟 아디다스 신발 컬렉션 할인",
    ];

    const result: PostPreviewEntity[] = [];

    for (let i = 0; i < count; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const title =
        bannerTitles[Math.floor(Math.random() * bannerTitles.length)] +
        ` #${i + 1}`;

      const now = new Date();
      const randomPast = new Date(
        now.getTime() - Math.random() * 24 * 60 * 60 * 1000, // 최근 24시간
      );

      result.push(
        new PostPreviewEntity({
          id: 10000 + i,
          title,
          author: new UserEntity({
            id: 1,
            nickname: "할인탐정",
            name: "할인탐정",
            picture: "https://randomuser.me/api/portraits/men/1.jpg",
            provider: "local",
            role: "user",
            email: "",
          }),
          commentsCount: Math.floor(Math.random() * 200) + 50, // 50-250 댓글
          createdAt: randomPast.toISOString(),
          updatedAt: randomPast.toISOString(),
          deletedAt: null,
          viewsCount: Math.floor(Math.random() * 5000) + 1000, // 1000-6000 조회수
          thumbnailUrl:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
          likesCount: Math.floor(Math.random() * 300) + 100, // 100-400 좋아요
          isLikedByMe: false,
          isMine: false,
          isReportedByMe: false,
          isBlurredByAI: false,
          isBlockedByMe: false,
          tags: [],
          category: {
            id: category.id,
            name: category.name,
          },
        }),
      );
    }

    return result;
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

  private generateMockPostPreviews(count: number): PostPreviewEntity[] {
    const categories = [
      { id: 1, name: "전자제품" },
      { id: 2, name: "의류" },
      { id: 3, name: "음식" },
      { id: 4, name: "도서" },
      { id: 5, name: "생활용품" },
    ];

    const titles = [
      "삼성 갤럭시 최대 30% 할인",
      "나이키 운동화 특가 세일",
      "스타벅스 원두 반값 할인",
      "베스트셀러 도서 50% 할인",
      "다이슨 청소기 특가 이벤트",
      "애플 아이폰 할인 혜택",
      "아디다스 의류 세일",
      "교보문고 도서 할인전",
    ];

    const users = [
      new UserEntity({
        id: 1,
        nickname: "할인탐정",
        name: "할인탐정",
        picture: "https://randomuser.me/api/portraits/men/1.jpg",
        provider: "local",
        role: "user",
        email: "",
      }),
    ];

    const result: PostPreviewEntity[] = [];
    for (let i = 0; i < count; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const title =
        titles[Math.floor(Math.random() * titles.length)] + ` #${i + 1}`;
      const user = users[0];

      const now = new Date();
      const randomPast = new Date(
        now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000, // 최근 30일
      );

      result.push(
        new PostPreviewEntity({
          id: i + 1,
          title,
          author: user,
          commentsCount: Math.floor(Math.random() * 20),
          createdAt: randomPast.toISOString(),
          updatedAt: randomPast.toISOString(),
          deletedAt: null,
          viewsCount: Math.floor(Math.random() * 1000),
          thumbnailUrl: `https://upload.wikimedia.org/wikipedia/ko/thumb/e/eb/%ED%8F%AC%EC%BC%93%EB%AA%AC%EC%8A%A4%ED%84%B0_%EB%A0%88%EB%93%9C%C2%B7%EA%B7%B8%EB%A6%B0%EC%9D%98_%ED%99%8D%EB%B3%B4_%EC%9E%91%ED%92%88%EC%97%90_%EB%AC%98%EC%82%AC_%EB%90%9C_%ED%94%BC%EC%B9%B4%EC%B8%84.png/250px-%ED%8F%AC%EC%BC%93%EB%AA%AC%EC%8A%A4%ED%84%B0_%EB%A0%88%EB%93%9C%C2%B7%EA%B7%B8%EB%A6%B0%EC%9D%98_%ED%99%8D%EB%B3%B4_%EC%9E%91%ED%92%88%EC%97%90_%EB%AC%98%EC%82%AC_%EB%90%9C_%ED%94%BC%EC%B9%B4%EC%B8%84.png`,
          likesCount: Math.floor(Math.random() * 50),
          isLikedByMe: false,
          isMine: false,
          isReportedByMe: false,
          isBlurredByAI: false,
          isBlockedByMe: false,
          tags: [],
          category: {
            id: category.id,
            name: category.name,
          },
        }),
      );
    }
    return result;
  }

  async getPostPreviews({
    req,
  }: {
    req: PostPreviewsReqDto;
  }): Promise<PostPreviewEntity[]> {
    let result = this.mockPostPreviews;

    // 카테고리 필터링
    if (req.categoryId) {
      result = result.filter((post) => post.category.id === req.categoryId);
    }

    // ID 기준 내림차순 정렬 (최신순)
    result = result.sort((a, b) => b.id - a.id);

    // 커서 기반 페이지네이션
    if (req.cursor) {
      // cursor보다 작은 ID만 가져오기 (다음 페이지)
      result = result.filter((post) => post.id < req.cursor!);
    }

    // limit 적용
    const limit = req.limit || result.length;
    result = result.slice(0, limit);

    return result;
  }

  async getPostDetail(id: number): Promise<PostEntity> {
    const post = this.mockPosts.find((post) => post.id === id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }
}
