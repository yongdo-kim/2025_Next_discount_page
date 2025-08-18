import { EventEntity } from "@/features/events/domain/entities/event.entity";

export const EventsPreview = ({ event }: { event: EventEntity }) => {
  return <div>{event.title}</div>;
};
