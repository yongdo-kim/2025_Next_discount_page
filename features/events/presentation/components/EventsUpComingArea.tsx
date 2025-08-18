"use client";
import { MainListSection } from "@/components/common/MainListSection";
import { GiftIcon } from "@/components/ui/GiftIcon";
import { EventsPreview } from "@/features/events/presentation/components/EventsPreview";
import { useFetchEventsUpcoming } from "@/features/events/presentation/hooks/use-event-upcoming";
import { formatToMMDD } from "@/lib/utils";

export function EventsUpComingArea() {
  const { data: events, error, isError, refetch } = useFetchEventsUpcoming(8);

  return (
    <MainListSection
      title={`마감일이 가까워요! 오늘은 ${formatToMMDD(new Date().toISOString())!}`}
      icon={<GiftIcon />}
      data={events}
      error={error}
      isError={isError}
      refetch={refetch}
      renderItem={(event) => <EventsPreview event={event} />}
      getItemKey={(event) => event.eventId}
    />
  );
}
