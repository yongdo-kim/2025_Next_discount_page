"use client";

import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { GiftIcon } from "@/components/ui/GiftIcon";
import { EventsPreview } from "@/features/events/presentation/components/EventsPreview";
import { useFetchEventsLatest } from "@/features/events/presentation/hooks/use-event-latest";
import { isClientError } from "@/lib/error-handler";

export default function EventsLatestClient() {
  const { data: events, error, isError, refetch } = useFetchEventsLatest(12);
  const hasData = events && events.length > 0;

  return (
    <section className="pt-4 pb-2 md:pb-8">
      <div
        className={`flex justify-between px-4 ${hasData ? "pb-3" : "pb-4 md:pb-8"}`}
      >
        <MainTitle
          title={`최신 이벤트 목록을 가져왔어요!`}
          icon={<GiftIcon />}
        />
      </div>

      {isError && isClientError(error) && (
        <ErrorState error={error} onRetry={refetch} size="sm" />
      )}

      {hasData && (
        <div className="px-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {events.slice(0, 6).map((event) => (
                <EventsPreview key={event.eventId} event={event} />
              ))}
            </div>
            <div className="space-y-2">
              {events.slice(6, 12).map((event) => (
                <EventsPreview key={event.eventId} event={event} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
