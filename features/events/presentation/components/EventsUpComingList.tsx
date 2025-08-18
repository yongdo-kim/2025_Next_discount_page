"use client";

import { Badge } from "@/components/shadcn/badge";
import { useFetchEventsUpcoming } from "@/features/events/presentation/hooks/use-event-upcoming";

type EventListProps = {
  limit?: number;
};

export function EventsUpComingList({ limit }: EventListProps) {
  const { data: events, isLoading, error } = useFetchEventsUpcoming(limit);

  if (isLoading) {
    return <div className="p-4">이벤트를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">이벤트를 불러올 수 없습니다.</div>;
  }

  if (!events || events.length === 0) {
    return <div className="p-4">이벤트가 없습니다.</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {events.map((event) => (
        <div
          key={event.eventId}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="mb-3 flex items-start justify-between">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <Badge
              variant={new Date() < event.endDate ? "default" : "secondary"}
            >
              {new Date() < event.endDate ? "진행중" : "종료"}
            </Badge>
          </div>

          <div className="mb-4 space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">상품:</span> {event.prize}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">당첨자 수:</span> {event.winners}
            </p>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 text-sm">
            <div>
              <span className="text-gray-500">종료일:</span>
              {/* <div className="font-medium">
                {event.endDate.toISOString().split("T")[0]}
              </div> */}
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
            >
              참여하기
            </a>
            <a
              href={event.originSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-gray-500 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-600"
            >
              원본 보기
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
