import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import DiscountPlatformClient from "@/features/discounts/presentation/components/DiscountPlatformClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function DiscountPlatformServer() {
  await queryClient
    .fetchQuery({
      queryKey: discountKeys.platforms(),
      queryFn: async () => {
        const platforms =
          await container.discountService.getDiscountPlatforms();
        return JSON.parse(JSON.stringify(platforms));
      },
    })
    .catch(() => []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiscountPlatformClient />
    </HydrationBoundary>
  );
}
