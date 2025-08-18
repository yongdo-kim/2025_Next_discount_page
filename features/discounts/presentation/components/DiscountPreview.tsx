"use client";

import { PlatformTag } from "@/components/ui/PlatformTag";
import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import Link from "next/link";

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

export const DiscountPreview = ({ discount }: { discount: DiscountEntity }) => {
  const { platform, content } = splitTitleByPlatform(discount.title);

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: discountKeys.detail(discount.id),
      queryFn: () => container.discountService.getDiscountDetail(discount.id),
    });
  };

  return (
    <Link
      href={`/discounts/${discount.id}/detail`}
      onMouseEnter={handlePrefetch}
      className="flex items-center gap-2 pb-2 hover:cursor-pointer hover:underline"
    >
      {platform && <PlatformTag platform={platform} />}
      <span>{content}</span>
    </Link>
  );
};
