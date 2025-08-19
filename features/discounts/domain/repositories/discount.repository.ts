import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";

export interface DiscountRepository {
  getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]>;
  getDiscountDetail(id: number): Promise<PostEntity>;
}
