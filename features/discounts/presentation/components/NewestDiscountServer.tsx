import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import NewestDiscountClient from "@/features/discounts/presentation/components/NewestDiscountClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function NewestDiscountServer() {
  // 최신 할인 데이터를 prefetch
  await queryClient
    .fetchQuery({
      queryKey: discountKeys.newest(),
      queryFn: async () => {
        const discounts =
          await container.discountService.getNewestDiscountPreview(8);
        return JSON.parse(JSON.stringify(discounts));
      },
    })
    .catch(() => []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewestDiscountClient />
    </HydrationBoundary>
  );
}
