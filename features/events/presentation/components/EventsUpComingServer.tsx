import { eventKeys } from "@/features/events/infrastructure/constant/query-keys";
import EventsUpComingClient from "@/features/events/presentation/components/EventsUpComingClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function EventsUpComingServer() {
  // 마감일이 가까운 이벤트 데이터를 prefetch
  await queryClient
    .fetchQuery({
      queryKey: eventKeys.upcoming(8),
      queryFn: async () => {
        const events = await container.eventService.getEventsUpcoming(8);
        return JSON.parse(JSON.stringify(events));
      },
    })
    .catch(() => []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventsUpComingClient />
    </HydrationBoundary>
  );
}
