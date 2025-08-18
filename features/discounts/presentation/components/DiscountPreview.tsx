import { PlatformTag } from "@/components/ui/PlatformTag";
import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";

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

//프레페칭 기능 추가하기.

export const DiscountPreview = ({ discount }: { discount: DiscountEntity }) => {
  const { platform, content } = splitTitleByPlatform(discount.title);

  return (
    <div className="flex items-center gap-2 pb-2">
      {platform && <PlatformTag platform={platform} />}
      <div className="hover:cursor-pointer hover:underline">{content}</div>
    </div>
  );
};
