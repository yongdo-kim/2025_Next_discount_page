"use client";
import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { FlameIcon } from "@/components/ui/FlameIcon";
import { EventsPreview } from "@/features/events/presentation/components/EventsPreview";
import { useFetchEventsUpcoming } from "@/features/events/presentation/hooks/use-event-upcoming";
import { isClientError } from "@/lib/error-handler";

export function EventsUpComingArea() {
  const { data: events, error, isError, refetch } = useFetchEventsUpcoming(8);

  // 클라이언트 에러는 로컬에서 처리
  if (isError && isClientError(error)) {
    return (
      <section className="pt-4 pb-2 md:pb-8">
        <div className="flex justify-between px-4 pb-4 md:pb-8">
          <MainTitle title="오늘 마감" icon={<FlameIcon />} />
        </div>
        <ErrorState error={error} onRetry={refetch} size="sm" />
      </section>
    );
  }

  if (!events || events.length === 0) {
    return (
      <section className="pt-4 pb-2 md:pb-8">
        <div className="flex justify-between px-4 pb-4 md:pb-8">
          <MainTitle title="오늘 마감" icon={<FlameIcon />} />
        </div>
      </section>
    );
  }

  return (
    <section className="pt-4 pb-2">
      <div className="flex justify-between pb-4">
        <MainTitle title="오늘 마감" icon={<FlameIcon />} />
      </div>
      <ul className="px-4">
        {events?.map((event) => {
          if (!event) return null;
          return (
            <li className="list-none" key={event.eventId}>
              <EventsPreview event={event} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
