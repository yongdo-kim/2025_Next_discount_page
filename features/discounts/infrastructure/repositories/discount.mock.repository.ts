import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";

export class MockDiscountRepository implements DiscountRepository {
  //더미데이터

  async getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]> {
    const discounts = [
      new DiscountEntity({
        id: 1,
        title: "할인",
        description: "할인",
        originalPrice: 10000,
        discountedPrice: 10000,
        discountRate: 10,
        imageUrl: "",
        storeUrl: "",
        storeName: "",
        categoryId: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];
    return discounts.slice(0, limit);
  }
}
