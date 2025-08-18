"use client";
import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { DiscountPreview } from "@/features/discounts/presentation/components/DiscountPreview";
import { useNewestDiscountPreviews } from "@/features/discounts/presentation/hooks/use-fetch-discounts";
import { isClientError } from "@/lib/error-handler";
import { FlameIcon } from "@/components/ui/FlameIcon";

export function NewestDiscountArea() {
  const {
    data: discounts,
    error,
    isError,
    refetch,
  } = useNewestDiscountPreviews();

  const PostCardSmallList = () => {
    return (
      <ul className="">
        {discounts?.map((discount) => {
          if (!discount) return null;
          return (
            <li key={discount.id}>
              <DiscountPreview discount={discount} />
            </li>
          );
        })}
      </ul>
    );
  };

  // 클라이언트 에러는 로컬에서 처리
  if (isError && isClientError(error)) {
    return (
      <section className="pt-4 pb-2 md:pb-8">
        <div className="flex justify-between px-4 pb-4 md:pb-8">
          <MainTitle title="오늘의 할인" icon={<FlameIcon />} />
        </div>
        <ErrorState error={error} onRetry={refetch} size="sm" />
      </section>
    );
  }

  if (!discounts || discounts.length === 0) {
    return (
      <section className="pt-4 pb-2 md:pb-8">
        <div className="flex justify-between px-4 pb-4 md:pb-8">
          <MainTitle title="오늘의 할인" icon={<FlameIcon />} />
        </div>
      </section>
    );
  }

  return (
    <section className="pt-4 pb-2 md:pb-8">
      <div className="flex justify-between px-4 pb-4 md:pb-8">
        <MainTitle title="오늘의 할인" icon={<FlameIcon />} />
      </div>
      <PostCardSmallList />
    </section>
  );
}
