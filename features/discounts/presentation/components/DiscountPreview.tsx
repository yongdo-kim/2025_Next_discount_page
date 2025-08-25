"use client";

import { PlatformTag } from "@/components/ui/PlatformTag";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { postKeys } from "@/features/posts/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { splitTitleByPlatform } from "@/lib/utils";
import Link from "next/link";

export const DiscountPreview = ({
  discount,
}: {
  discount: PostPreviewEntity;
}) => {
  const { platform, content } = splitTitleByPlatform(discount.title);

  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: [postKeys.detail(discount.id)],
      queryFn: () => container.postService.getPostDetail(discount.id),
    });
  };

  return (
    <Link
      href={`/posts/${discount.id}`}
      onMouseEnter={handlePrefetch}
      className="flex items-center gap-2 pb-2 hover:cursor-pointer hover:underline"
      data-testid="discount-preview-link"
    >
      {platform && <PlatformTag platform={platform} />}
      <span className="truncate">{content}</span>
    </Link>
  );
};
