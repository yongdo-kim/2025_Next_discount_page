"use client";

import { PlatformTag } from "@/components/ui/PlatformTag";
import { useDiscountDetail } from "@/features/discounts/presentation/hooks/use-fetch-discounts";
import { sendGAEvent } from "@/lib/ga";
import { useEffect } from "react";

interface DiscountDetailProps {
  discountId: number;
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

export function DiscountDetail({ discountId }: DiscountDetailProps) {
  const {
    data: discount,
    isLoading,
    error,
  } = useDiscountDetail({
    discountId,
  });

  useEffect(() => {
    sendGAEvent("post_detail_view_init", {
      post_id: discountId,
      post_title: discount?.title,
      author_id: discount?.author?.id,
      author_nickname: discount?.author?.nickname,
    });
  }, [
    discount?.id,
    discount?.title,
    discount?.author?.id,
    discount?.author?.nickname,
  ]);

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
