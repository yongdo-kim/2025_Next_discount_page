import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountRepository } from "@/features/discounts/domain/repositories/discount.repository";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";

export class DiscountService {
  constructor(private discountRepository: DiscountRepository) {}

  async getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]> {
    return await this.discountRepository.getNewestDiscountPreview(limit);
  }

  async getDiscountDetail(id: number): Promise<PostEntity> {
    return await this.discountRepository.getDiscountDetail(id);
  }
}
