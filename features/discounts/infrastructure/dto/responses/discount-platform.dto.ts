import {
  DiscountPlatformGroup,
  DiscountPlatformPreviewEntity,
} from "@/features/discounts/domain/entities/discount-platform.entity";
import { z } from "zod";

export const discountPlatformSchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string(),
  views: z.number(),
  postImages: z.array(z.string()),
});

export const discountByPlatformResponseSchema = z.object({
  kakao: z.array(discountPlatformSchema),
  coupang: z.array(discountPlatformSchema),
  naver: z.array(discountPlatformSchema),
  ohouse: z.array(discountPlatformSchema),
  gmarket: z.array(discountPlatformSchema),
});

export type DiscountPlatformPreviewDto = z.infer<typeof discountPlatformSchema>;
export type DiscountPlatformGroupDto = z.infer<
  typeof discountByPlatformResponseSchema
>;

export function toDiscountPlatformPreviewEntity(
  dto: DiscountPlatformPreviewDto,
): DiscountPlatformPreviewEntity {
  return new DiscountPlatformPreviewEntity({
    id: dto.id,
    title: dto.title,
    createdAt: new Date(dto.createdAt),
    views: dto.views,
    postImages: dto.postImages,
  });
}

export function toDiscountPlatformGroupEntity(
  dto: DiscountPlatformGroupDto,
): DiscountPlatformGroup {
  return new DiscountPlatformGroup({
    kakao: dto.kakao.map(toDiscountPlatformPreviewEntity),
    coupang: dto.coupang.map(toDiscountPlatformPreviewEntity),
    naver: dto.naver.map(toDiscountPlatformPreviewEntity),
    ohouse: dto.ohouse.map(toDiscountPlatformPreviewEntity),
    gmarket: dto.gmarket.map(toDiscountPlatformPreviewEntity),
  });
}
