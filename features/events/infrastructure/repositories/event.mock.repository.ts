import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { EventRepository } from "@/features/events/domain/repositories/event.repository";
import { PostSourceEntity } from "@/features/posts/domain/entities/post-source.entity";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { UserEntity } from "@/features/users/domain/entities/user.entity";

export class MockEventRepository implements EventRepository {
  private mockEvents: EventEntity[] = [
    new EventEntity({
      postId: 522,
      eventId: 207,
      title: "제주특별자치도 댓글응모",
      prize: "상품권",
      winners: "30명",
      endDate: "2025-08-19T00:00:00.000Z",
      link: "https://www.eventhouse.kr/site/",
      eventMethod: "댓글응모",
      originSourceUrl:
        "https://www.youtube.com/post/Ugkxg2cWuFbX7PeWMPG5WV8yLHzSXCOEiJHf?app=desktop&utm_src=ehi",
      ogImage:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzllYTNmNyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IjMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkV2ZW50IEltYWdlPC90ZXh0Pjwvc3ZnPg==",
    }),
    new EventEntity({
      postId: 523,
      eventId: 208,
      title: "신년 특가 이벤트",
      prize: "현금",
      winners: "10명",
      endDate: "2025-01-07T00:00:00.000Z",
      link: "https://www.example.com/event",
      originSourceUrl: "https://www.example.com/original",
      eventMethod: "댓글응모",
      ogImage:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzllYTNmNyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IjMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkV2ZW50IEltYWdlPC90ZXh0Pjwvc3ZnPg==",
    }),
    new EventEntity({
      postId: 524,
      eventId: 209,
      title: "발렌타인데이 특별 할인",
      prize: "기프트카드",
      winners: "50명",
      endDate: "2025-02-15T00:00:00.000Z",
      link: "https://www.valentine.com/sale",
      eventMethod: "댓글응모",
      originSourceUrl: "https://www.valentine.com/source",
      ogImage:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzllYTNmNyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IjMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkV2ZW50IEltYWdlPC90ZXh0Pjwvc3ZnPg==",
    }),
  ];

  // Mock data for PostEntity
  mockPostEntity = new PostEntity({
    id: 1,
    title: "[쿠팡] 삼성 갤럭시 버즈3 50% 할인 이벤트",
    content: `
      <table border="1">
        <tr>
          <th>제품명</th>
          <th>할인가</th>
          <th>정가</th>
          <th>할인율</th>
        </tr>
        <tr>
          <td>삼성 갤럭시 버즈3</td>
          <td>99,000원</td>
          <td>198,000원</td>
          <td>50%</td>
        </tr>
      </table>
      
      <h3>주요 특징</h3>
      <ul>
        <li>노이즈 캔슬링 기능</li>
        <li>무선 충전 지원</li>
        <li>24시간 배터리</li>
        <li>방수 기능 (IPX7)</li>
      </ul>
      
      <h3>할인 혜택</h3>
      <p>쿠팡에서 진행하는 특별 할인 이벤트로 50% 할인된 가격에 만나보실 수 있습니다.</p>
      <p>배송비 무료, 쿠팡 로켓배송으로 빠른 배송 가능합니다.</p>
    `,
    author: new UserEntity({
      id: 1,
      email: "discount@example.com",
      nickname: "할인탐정",
      name: "할인탐정",
      picture: "/discount-character.webp",
      provider: "google",
      role: "user",
    }),
    commentsCount: 12,
    createdAt: "2024-08-19T10:30:00Z",
    updatedAt: null,
    deletedAt: null,
    viewsCount: 1250,
    imageUrl:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbQrxeP%2FbtsJ9xK7j0Q%2FkKkK7HK8K1QK7HK8K1QK7H%2Fimg.jpg",
    likesCount: 45,
    isLikedByMe: false,
    isMine: false,
    isReportedByMe: false,
    isBlurredByAI: false,
    isBlockedByMe: false,
    tags: [
      new TagEntity({ id: 1, name: "전자제품" }),
      new TagEntity({ id: 2, name: "무선이어폰" }),
      new TagEntity({ id: 3, name: "삼성" }),
      new TagEntity({ id: 4, name: "쿠팡" }),
    ],
    source: new PostSourceEntity({
      scrapingSourceUrl: "https://www.coupang.com/vp/products/7123456789",
      originSourceUrl: "https://www.samsung.com/sec/audio/galaxy-buds3/",
    }),
    event: null,
  });

  async getEventDetail(id: number): Promise<PostEntity> {
    if (id == -1) {
      throw new Error("MockEventRepository.getEventDetail: id is not 1");
    }
    return this.mockPostEntity;
  }

  async getEventsUpcoming(limit?: number): Promise<EventEntity[]> {
    return this.mockEvents.slice(0, limit);
  }

  async getEventsLatest(limit?: number): Promise<EventEntity[]> {
    return this.mockEvents.slice(0, limit);
  }
}
