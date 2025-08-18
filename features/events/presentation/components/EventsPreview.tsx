import { EventTypeTag } from "@/components/ui/EventTypeTag";
import { EventEntity } from "@/features/events/domain/entities/event.entity";
import { formatToMMDD } from "@/lib/utils";

export const EventsPreview = ({ event }: { event: EventEntity }) => {
  return (
    <div className="flex items-center gap-2 pb-2 hover:cursor-pointer hover:underline">
      <div>{EventTypeTag({ eventType: event.eventMethod })}</div>
      <div>{event.title + " 이벤트"}</div>
      <div>{formatToMMDD(event.endDate) + "까지"}</div>
    </div>
  );
};
