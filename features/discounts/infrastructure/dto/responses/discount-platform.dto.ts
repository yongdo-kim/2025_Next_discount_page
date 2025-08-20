import { z } from "zod";
import {
  DiscountPostEntity,
  DiscountByPlatformEntity,
} from "@/features/discounts/domain/entities/discount-platform.entity";

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

export type DiscountPostDto = z.infer<typeof discountPostSchema>;
export type DiscountByPlatformDto = z.infer<
  typeof discountByPlatformResponseSchema
>;

export function toDiscountPostEntity(dto: DiscountPostDto): DiscountPostEntity {
  return new DiscountPostEntity({
    id: dto.id,
    title: dto.title,
    createdAt: new Date(dto.created_at),
    views: dto.views,
    postImages: dto.post_images,
  });
}

export function toDiscountByPlatformEntity(
  dto: DiscountByPlatformDto,
): DiscountByPlatformEntity {
  return new DiscountByPlatformEntity({
    kakao: dto.kakao.map(toDiscountPostEntity),
    coupang: dto.coupang.map(toDiscountPostEntity),
    naver: dto.naver.map(toDiscountPostEntity),
    ohouse: dto.ohouse.map(toDiscountPostEntity),
    gmarket: dto.gmarket.map(toDiscountPostEntity),
  });
}
