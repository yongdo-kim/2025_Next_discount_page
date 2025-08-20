import { discountKeys } from "@/features/discounts/infrastructure/constant/query-keys";
import { eventKeys } from "@/features/events/infrastructure/constant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { MainAdAreaClient } from "./MainAdAreaClient";

export default async function MainAdAreaServer() {
  await Promise.all([
    queryClient
      .fetchQuery({
        queryKey: discountKeys.newest(),
        queryFn: async () => {
          const discounts =
            await container.discountService.getNewestDiscountPreview(8);
          return JSON.parse(JSON.stringify(discounts));
        },
      })
      .catch(() => []),

    queryClient
      .fetchQuery({
        queryKey: eventKeys.latest(12),
        queryFn: async () => {
          const events = await container.eventService.getEventsLatest(12);
          return JSON.parse(JSON.stringify(events));
        },
      })
      .catch(() => []),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainAdAreaClient />
    </HydrationBoundary>
  );
}
