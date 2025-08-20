import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";
import { discountApi } from "@/features/discounts/infrastructure/api/discount.api";
import { toEntity } from "@/features/discounts/infrastructure/dto/discount.dto";

export class HttpDiscountRepository implements DiscountRepository {
  async getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]> {
    const discounts = await discountApi.getNewestDiscountPreview(limit);
    return discounts.map(toEntity);
  }

  async getDiscountsByPlatforms(): Promise<DiscountEntity[]> {
    const discounts = await discountApi.getDiscountsByPlatforms();
    return discounts.map(toEntity);
  }
}
