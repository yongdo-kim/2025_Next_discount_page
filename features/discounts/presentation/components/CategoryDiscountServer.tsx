import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import CategoryDiscountClient from "@/features/discounts/presentation/components/CategoryDiscountClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function CategoryDiscountServer() {
  // 핫 카테고리 할인 데이터를 prefetch
  await queryClient
    .fetchQuery({
      queryKey: discountKeys.hotCategory(),
      queryFn: async () => {
        const discounts =
          await container.discountService.getDiscountsByHotCategory();
        return JSON.parse(JSON.stringify(discounts));
      },
    })
    .catch(() => []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryDiscountClient />
    </HydrationBoundary>
  );
}
