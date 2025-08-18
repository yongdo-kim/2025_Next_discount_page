import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";

export interface DiscountRepository {
  getNewestDiscountPreview(limit?: number): Promise<DiscountEntity[]>;
  getDiscountDetail(id: number): Promise<DiscountEntity>;
}
