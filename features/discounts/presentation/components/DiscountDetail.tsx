"use client";

import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { PlatformTag } from "@/components/ui/PlatformTag";

interface DiscountDetailProps {
  discountId: number;
  initialDiscount?: DiscountEntity;
}

function splitTitleByPlatform(title: string): {
  platform: string | null;
  content: string;
} {
  const platformMatch = title.match(/\[.*?\]/);
  if (platformMatch) {
    const platform = platformMatch[0];
    const content = title.replace(/\[.*?\]\s*/, "").trim();
    return { platform, content };
  }
  return { platform: null, content: title };
}

export function DiscountDetail({
  discountId,
  initialDiscount,
}: DiscountDetailProps) {
  const {
    data: discount,
    isLoading,
    error,
  } = useQuery({
    queryKey: discountKeys.detail(discountId),
    queryFn: () => container.discountService.getDiscountDetail(discountId),
    initialData: initialDiscount,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !discount) return <div>할인 정보를 찾을 수 없습니다.</div>;

  const { platform, content } = splitTitleByPlatform(discount.title);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 pb-2 hover:cursor-pointer hover:underline">
        {platform && <PlatformTag platform={platform} />}
        <span>{content}</span>
      </div>
    </div>
  );
}
