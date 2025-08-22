import { DiscountPlatformGroup } from "@/features/discounts/domain/entities/discount-platform.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";

export class DiscountService {
  constructor(private discountRepository: DiscountRepository) {}

  async getNewestDiscountPreview(limit?: number): Promise<PostPreviewEntity[]> {
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
