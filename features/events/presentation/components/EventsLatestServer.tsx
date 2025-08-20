import { eventKeys } from "@/features/events/infrastructure/constant/query-keys";
import EventsLatestClient from "@/features/events/presentation/components/EventsLatestClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function EventsLatestServer() {
  await queryClient
    .fetchQuery({
      queryKey: eventKeys.latest(12),
      queryFn: async () => {
        const events = await container.eventService.getEventsLatest(12);
        return JSON.parse(JSON.stringify(events));
      },
    })
    .catch(() => []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventsLatestClient />
    </HydrationBoundary>
  );
}
