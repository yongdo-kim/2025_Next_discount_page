"use client";

import { EventTypeTag } from "@/components/ui/EventTypeTag";
import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { postKeys } from "@/features/posts/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { formatToMMDD } from "@/lib/utils";
import Link from "next/link";

export const EventsPreview = ({ event }: { event: EventEntity }) => {
  const handlePrefetch = () => {
    queryClient.prefetchQuery({
      queryKey: postKeys.detail(event.postId),
      queryFn: () => container.postService.getPostDetail(event.postId),
    });
  };

  return (
    <Link
      href={`/posts/${event.postId}`}
      onMouseEnter={handlePrefetch}
      className="flex items-center gap-2 pb-2 hover:cursor-pointer hover:underline"
    >
      <div>{EventTypeTag({ eventType: event.eventMethod })}</div>
      <div>{event.title + " 이벤트"}</div>
      <div>{formatToMMDD(event.endDate) + "까지"}</div>
    </Link>
  );
};
