"use client";
import { MainListSection } from "@/components/common/MainListSection";
import { FlameIcon } from "@/components/ui/FlameIcon";
import { DiscountPreview } from "@/features/discounts/presentation/components/DiscountPreview";
import { useNewestDiscountPreviews } from "@/features/discounts/presentation/hooks/use-fetch-discounts";

export function NewestDiscountArea() {
  const {
    data: discounts,
    error,
    isError,
    refetch,
  } = useNewestDiscountPreviews();

  return (
    <MainListSection
      title="오늘의 할인"
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
