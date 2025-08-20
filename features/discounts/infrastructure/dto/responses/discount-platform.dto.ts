import {
  DiscountPlatformGroup,
  DiscountPlatformPreviewEntity,
} from "@/features/discounts/domain/entities/discount-platform.entity";
import { z } from "zod";

export const discountPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_at: z.string(),
  views: z.number(),
  post_images: z.array(z.string()),
});

export const discountByPlatformResponseSchema = z.object({
  kakao: z.array(discountPostSchema),
  coupang: z.array(discountPostSchema),
  naver: z.array(discountPostSchema),
  ohouse: z.array(discountPostSchema),
  gmarket: z.array(discountPostSchema),
});

export type DiscountPlatformPreviewDto = z.infer<typeof discountPostSchema>;
export type DiscountPlatformGroupDto = z.infer<
  typeof discountByPlatformResponseSchema
>;

export function toDiscountPlatformPreviewEntity(
  dto: DiscountPlatformPreviewDto,
): DiscountPlatformPreviewEntity {
  return new DiscountPlatformPreviewEntity({
    id: dto.id,
    title: dto.title,
    createdAt: new Date(dto.created_at),
    views: dto.views,
    postImages: dto.post_images,
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
