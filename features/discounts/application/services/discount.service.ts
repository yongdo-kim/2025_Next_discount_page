import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";

export class DiscountService {
  constructor(private discountRepository: DiscountRepository) {}

  async getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]> {
    return await this.discountRepository.getNewestDiscountPreview(limit);
  }

  async getDiscountsByHotCategory(): Promise<DiscountEntity[]> {
    return await this.discountRepository.getDiscountsByHotCategory();
  }
}
