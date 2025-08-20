import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { UserEntity } from "@/features/users/domain/entities/user.entity";

export class MockDiscountRepository implements DiscountRepository {
  //더미데이터
  private mockDiscounts = [
    new DiscountEntity({
      id: 1,
      title: "[쿠팡] 스마트폰 할인 특가",
      description: "최신 스마트폰 특가 할인",
      originalPrice: 500000,
      discountedPrice: 400000,
      discountRate: 20,
      imageUrl: "https://example.com/phone.jpg",
      storeUrl: "https://coupang.com",
      storeName: "쿠팡",
      categoryId: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    new DiscountEntity({
      id: 2,
      title: "[11번가] 노트북 특가",
      description: "게이밍 노트북 할인",
      originalPrice: 1000000,
      discountedPrice: 800000,
      discountRate: 20,
      imageUrl: "https://example.com/laptop.jpg",
      storeUrl: "https://11st.co.kr",
      storeName: "11번가",
      categoryId: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];

  async getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]> {
    return this.mockDiscounts.slice(0, limit);
  }

  async getDiscountsByPlatforms(): Promise<DiscountEntity[]> {
    return this.mockDiscounts;
  }

  async getDiscountDetail(id: number): Promise<PostEntity> {
    return new PostEntity({
      id: id + 3,
      title: "할인 정보",
      content: "할인 정보",
      imageUrl: "https://example.com/laptop.jpg",
      author: new UserEntity({
        id: 1,
        nickname: "test",
        picture: "https://example.com/laptop.jpg",
        name: "test",
        provider: "local",
        role: "user",
        email: "",
      }),
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
      viewsCount: 0,
      likesCount: 0,
      isLikedByMe: false,
      isReportedByMe: false,
      isBlurredByAI: false,
      isBlockedByMe: false,
      isMine: false,
      tags: [],
      source: {
        scrapingSourceUrl: "https://naver.com",
        originSourceUrl: "https://naver.com",
      },
      event: {
        organizer: "서울특별시",
        entryMethod: "단순응모",
        winners: "30명",
        prize: "기프티콘",
        period: "2025-09-07T00:00:00.000Z",
      },
    });
  }
}
