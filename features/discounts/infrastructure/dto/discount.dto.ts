import { z } from "zod";
import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";

export const discountResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  originalPrice: z.number(),
  discountedPrice: z.number(),
  discountRate: z.number(),
  imageUrl: z.string().optional(),
  storeUrl: z.string(),
  storeName: z.string(),
  categoryId: z.number().optional(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const discountListResponseSchema = z.object({
  discounts: z.array(discountResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type DiscountDto = z.infer<typeof discountResponseSchema>;
export type DiscountListDto = z.infer<typeof discountListResponseSchema>;

export function toEntity(dto: DiscountDto): DiscountEntity {
  return new DiscountEntity({
    id: dto.id,
    title: dto.title,
    description: dto.description,
    originalPrice: dto.originalPrice,
    discountedPrice: dto.discountedPrice,
    discountRate: dto.discountRate,
    imageUrl: dto.imageUrl,
    storeUrl: dto.storeUrl,
    storeName: dto.storeName,
    categoryId: dto.categoryId,
    isActive: dto.isActive,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  });
}
