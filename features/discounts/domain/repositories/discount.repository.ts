import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountPlatformGroup } from "@/features/discounts/domain/entities/discount-platform.entity";

export interface DiscountRepository {
  getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]>;
  getDiscountPlatforms(): Promise<DiscountPlatformGroup>;
}
