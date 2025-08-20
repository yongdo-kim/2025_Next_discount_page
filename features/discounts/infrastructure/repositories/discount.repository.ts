import { DiscountPlatformGroup } from "@/features/discounts/domain/entities/discount-platform.entity";
import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";
import { discountApi } from "@/features/discounts/infrastructure/api/discount.api";
import { toEntity } from "@/features/discounts/infrastructure/dto/discount.dto";
import { toDiscountPlatformGroupEntity } from "@/features/discounts/infrastructure/dto/responses/discount-platform.dto";

export class HttpDiscountRepository implements DiscountRepository {
  async getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]> {
    const discounts = await discountApi.getNewestDiscountPreview(limit);
    return discounts.map(toEntity);
  }

  async getDiscountPlatforms(): Promise<DiscountPlatformGroup> {
    const discounts = await discountApi.getDiscountPlatforms();
    return toDiscountPlatformGroupEntity(discounts);
  }
}
