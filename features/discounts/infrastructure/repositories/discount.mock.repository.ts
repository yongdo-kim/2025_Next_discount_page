import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";

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

  async getDiscountDetail(id: number): Promise<DiscountEntity> {
    const discount = this.mockDiscounts.find((d) => d.id === id);
    if (!discount) {
      throw new Error("404");
    }
    return discount;
  }
}
