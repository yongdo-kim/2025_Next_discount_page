import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";
import { discountApi } from "@/features/discounts/infrastructure/api/discount.api";
import { toEntity } from "@/features/discounts/infrastructure/dto/discount.dto";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { toPostEntity } from "@/features/posts/infrastructure/dto/responses/post.res.dto";

export class HttpDiscountRepository implements DiscountRepository {
  async getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]> {
    const discounts = await discountApi.getNewestDiscountPreview(limit);
    return discounts.map(toEntity);
  }

  async getDiscountDetail(id: number): Promise<PostEntity> {
    const discount = await discountApi.getDiscountDetail(id);
    return toPostEntity(discount);
  }
}
