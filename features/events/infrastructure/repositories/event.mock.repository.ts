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
        "https://instagram.ficn4-1.fna.fbcdn.net/v/t39.30808-6/531278854_1069739048669129_8084525408095322664_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEyMDB4MTUwMC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.ficn4-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QHj_pDOhGUhM3Cgozgzte4SzBFDcnhbe8Pjm8B6rIufJ6evLGvRrtaJuDcDLd5Lgeo&_nc_ohc=Hr1X9X1O1WYQ7kNvwFjc2pU&_nc_gid=JYqDM0IoK5K2wb0lHKAXWw&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzY5ODAxNDE2NjU5Mjg4Mzc4Nw%3D%3D.3-ccb7-5&oh=00_AfVxT83k-EegYfIIbAD3cZmXh1TPoYTvb1-FPnSE4djz7A&oe=68AA50CF&_nc_sid=10d13b",
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
        "https://instagram.ficn4-1.fna.fbcdn.net/v/t39.30808-6/531278854_1069739048669129_8084525408095322664_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEyMDB4MTUwMC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.ficn4-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QHj_pDOhGUhM3Cgozgzte4SzBFDcnhbe8Pjm8B6rIufJ6evLGvRrtaJuDcDLd5Lgeo&_nc_ohc=Hr1X9X1O1WYQ7kNvwFjc2pU&_nc_gid=JYqDM0IoK5K2wb0lHKAXWw&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzY5ODAxNDE2NjU5Mjg4Mzc4Nw%3D%3D.3-ccb7-5&oh=00_AfVxT83k-EegYfIIbAD3cZmXh1TPoYTvb1-FPnSE4djz7A&oe=68AA50CF&_nc_sid=10d13b",
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
        "https://instagram.ficn4-1.fna.fbcdn.net/v/t39.30808-6/531278854_1069739048669129_8084525408095322664_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEyMDB4MTUwMC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.ficn4-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QHj_pDOhGUhM3Cgozgzte4SzBFDcnhbe8Pjm8B6rIufJ6evLGvRrtaJuDcDLd5Lgeo&_nc_ohc=Hr1X9X1O1WYQ7kNvwFjc2pU&_nc_gid=JYqDM0IoK5K2wb0lHKAXWw&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzY5ODAxNDE2NjU5Mjg4Mzc4Nw%3D%3D.3-ccb7-5&oh=00_AfVxT83k-EegYfIIbAD3cZmXh1TPoYTvb1-FPnSE4djz7A&oe=68AA50CF&_nc_sid=10d13b",
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
}
