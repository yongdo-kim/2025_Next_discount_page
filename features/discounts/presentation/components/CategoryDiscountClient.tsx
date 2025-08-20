"use client";

import { MainListSection } from "@/components/common/MainListSection";
import { FlameIcon } from "@/components/ui/FlameIcon";
import { DiscountEntity } from "@/features/discounts/domain/entities/discount.entity";
import { DiscountPreview } from "@/features/discounts/presentation/components/DiscountPreview";
import { useFetchHotCategoryDiscounts } from "@/features/discounts/presentation/hooks/use-fetch-category-discounts";

interface CategoryDiscountClientProps {
  title?: string;
}

export default function CategoryDiscountClient({
  title = "핫 카테고리 할인",
}: CategoryDiscountClientProps) {
  const {
    data: discounts,
    error,
    isError,
    refetch,
  } = useFetchHotCategoryDiscounts();

  return (
    <MainListSection<DiscountEntity>
      title={title}
      icon={<FlameIcon />}
      data={discounts}
      error={error}
      isError={isError}
      refetch={refetch}
      renderItem={(discount) => <DiscountPreview discount={discount} />}
      getItemKey={(discount) => discount.id}
    />
  );
}
