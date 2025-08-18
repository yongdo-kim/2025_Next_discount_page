export const EventTypeTag = ({ eventType }: { eventType: string }) => {
  const getEventTypeStyle = (eventText: string): string => {
    const cleanEventType = eventText.replace(/[\[\]]/g, "").toLowerCase();

    if (cleanEventType.includes("댓글응모")) {
      return "bg-gradient-to-br from-blue-500 to-blue-700 text-white";
    } else if (cleanEventType.includes("선착순")) {
      return "bg-gradient-to-br from-orange-500 to-orange-700 text-white";
    } else if (cleanEventType.includes("퀴즈응모")) {
      return "bg-gradient-to-br from-purple-500 to-purple-700 text-white";
    } else if (cleanEventType.includes("소문내기")) {
      return "bg-gradient-to-br from-green-500 to-green-700 text-white";
    } else if (
      cleanEventType.includes("설문") ||
      cleanEventType.includes("투표")
    ) {
      return "bg-gradient-to-br from-teal-500 to-teal-700 text-white";
    } else if (
      cleanEventType.includes("사진") ||
      cleanEventType.includes("인증샷")
    ) {
      return "bg-gradient-to-br from-pink-500 to-pink-700 text-white";
    } else if (cleanEventType.includes("단순응모")) {
      return "bg-gradient-to-br from-indigo-500 to-indigo-700 text-white";
    }

    return "bg-gradient-to-br from-gray-400 to-gray-600 text-white";
  };

  return (
    <span
      className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${getEventTypeStyle(eventType)}`}
    >
      {eventType}
    </span>
  );
};
