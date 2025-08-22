import { DiscountPlatformGroup } from "@/features/discounts/domain/entities/discount-platform.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";
import { discountApi } from "@/features/discounts/infrastructure/api/discount.api";
import { toDiscountPlatformGroupEntity } from "@/features/discounts/infrastructure/dto/responses/discount-platform.dto";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { toPostPreviewEntity } from "@/features/posts/infrastructure/dto/responses/post-preview.res.dto";

export class HttpDiscountRepository implements DiscountRepository {
  async getNewestDiscountPreview(limit?: number): Promise<PostPreviewEntity[]> {
    const discounts = await discountApi.getNewestDiscountPreview(limit);
    return discounts.map(toPostPreviewEntity);
  }

  async getDiscountPlatforms(): Promise<DiscountPlatformGroup> {
    const discounts = await discountApi.getDiscountPlatforms();
    return toDiscountPlatformGroupEntity(discounts);
  }
}
