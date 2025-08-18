"use client";

import MainTitle from "@/components/MainTitle";
import { useFetchActiveEvents } from "@/features/events/presentation/hooks/use-fetch-events";
import { Calendar } from "lucide-react";

export default function EventDiscountArea() {
  const { data: events } = useFetchActiveEvents();

  if (!events || events.length === 0) return null;

  return (
    <section className="pt-8 pb-2 md:pt-8 md:pb-8">
      <div className="flex justify-between px-4 pt-4 pb-4">
        <MainTitle title="이벤트 할인" icon={<Calendar />} />
      </div>

      <div className="space-y-4 px-4">
        {events.map((event) => (
          <div
            key={event.eventId}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <h3 className="mb-2 text-lg font-semibold">{event.title}</h3>
            <div className="mb-3 space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">상품:</span> {event.prize}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">당첨자:</span> {event.winners}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-500">
                종료: {event.endDate.toLocaleDateString()}
              </span>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600"
              >
                참여
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
