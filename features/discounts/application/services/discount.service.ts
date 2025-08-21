import { DiscountPlatformGroup } from "@/features/discounts/domain/entities/discount-platform.entity";
import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";

export class DiscountService {
  constructor(private discountRepository: DiscountRepository) {}

  async getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]> {
    const discounts =
      await this.discountRepository.getNewestDiscountPreview(limit);

    // Filter out duplicates based on title
    const uniqueDiscounts = discounts.filter(
      (discount, index, array) =>
        array.findIndex((d) => d.title === discount.title) === index,
    );

    return uniqueDiscounts;
  }

  async getDiscountPlatforms(): Promise<DiscountPlatformGroup> {
    return await this.discountRepository.getDiscountPlatforms();
  }
}
