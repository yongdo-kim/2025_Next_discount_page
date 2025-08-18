import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { EventRepository } from "@/features/events/domain/repositories/event.repository";

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
    }),
  ];

  async getEvents(query?: string): Promise<EventEntity[]> {
    if (query) {
      const searchTerm = query.toLowerCase();
      return this.mockEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm) ||
          event.prize.toLowerCase().includes(searchTerm),
      );
    }
    return this.mockEvents;
  }

  async getEventsUpcoming(limit?: number): Promise<EventEntity[]> {
    return this.mockEvents.slice(0, limit);
  }
}
