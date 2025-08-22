import { DiscountPlatformGroup } from "@/features/discounts/domain/entities/discount-platform.entity";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";

export interface DiscountRepository {
  getNewestDiscountPreview(limit?: number): Promise<PostPreviewEntity[]>;
  getDiscountPlatforms(): Promise<DiscountPlatformGroup>;
}
