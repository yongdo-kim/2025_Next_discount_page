"use client";

import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { TicketIcon } from "@/components/ui/TicketIcon";
import { EventsPreview } from "@/features/events/presentation/components/EventsPreview";
import { useFetchEventsLatest } from "@/features/events/presentation/hooks/use-event-latest";
import { isClientError } from "@/lib/error-handler";
import { gsap } from "gsap";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function EventsLatestClient() {
  const { data: events, error, isError, refetch } = useFetchEventsLatest(12);
  const hasData = events && events.length > 0;
  const [showMore, setShowMore] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const secondColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (secondColumnRef.current && isMobile && isMounted) {
      if (showMore) {
        gsap.fromTo(
          secondColumnRef.current,
          { height: 0, opacity: 0, willChange: "height, opacity" },
          {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              if (secondColumnRef.current) {
                gsap.set(secondColumnRef.current, { willChange: "auto" });
              }
            },
          },
        );
      } else {
        const currentHeight = secondColumnRef.current.scrollHeight;
        gsap.fromTo(
          secondColumnRef.current,
          { height: currentHeight, opacity: 1, willChange: "height, opacity" },
          {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              if (secondColumnRef.current) {
                gsap.set(secondColumnRef.current, { willChange: "auto" });
              }
            },
          },
        );
      }
    }
  }, [showMore, isMobile, isMounted]);

  const handleToggleMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="py-4 lg:py-8">
      <div
        className={`flex justify-between px-4 ${hasData ? "pb-3" : "pb-4 md:pb-8"}`}
      >
        <MainTitle
          title={`최신 이벤트 목록을 가져왔어요!`}
          icon={<TicketIcon className="h-5 w-5" />}
        />
      </div>

      {isError && isClientError(error) && (
        <ErrorState error={error} onRetry={refetch} size="sm" />
      )}

      {hasData && (
        <div className="px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              {events.slice(0, 6).map((event) => (
                <EventsPreview key={event.eventId} event={event} />
              ))}
            </div>
            <div
              ref={secondColumnRef}
              className={`space-y-2 overflow-hidden md:block`}
              style={{
                height: !isMounted
                  ? "auto"
                  : isMobile
                    ? showMore
                      ? "auto"
                      : "0"
                    : "auto",
              }}
            >
              {events.slice(6, 12).map((event) => (
                <EventsPreview key={event.eventId} event={event} />
              ))}
            </div>
          </div>

          {events.length > 6 && isMounted && (
            <div className="mt-4 flex justify-center md:hidden">
              <div
                role="button"
                onClick={handleToggleMore}
                className="flex cursor-pointer text-gray-300"
              >
                <div className="flex items-center space-x-2">
                  <span className="mr-2">{showMore ? "접기" : "더보기"}</span>
                  <span className="mr-2">
                    {showMore ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
