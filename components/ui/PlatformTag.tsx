interface PlatformTagProps {
  platform: string;
}

export const PlatformTag = ({ platform }: PlatformTagProps) => {
  const getPlatformStyle = (platformText: string): string => {
    const cleanPlatform = platformText.replace(/[\[\]]/g, "").toLowerCase();

    if (
      cleanPlatform.includes("네이버") ||
      cleanPlatform.includes("지마켓") ||
      cleanPlatform.includes("g마켓") ||
      cleanPlatform.includes("G마켓")
    ) {
      return "bg-gradient-to-br from-green-500 to-green-700 text-white";
    } else if (cleanPlatform.includes("카카오")) {
      return "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white";
    } else if (cleanPlatform.includes("스팀")) {
      return "bg-gradient-to-br from-blue-500 to-blue-700 text-white";
    } else if (
      cleanPlatform.includes("쿠팡") ||
      cleanPlatform.includes("롯데온") ||
      cleanPlatform.includes("하이마트몰")
    ) {
      return "bg-gradient-to-br from-red-500 to-red-700 text-white";
    } else if (cleanPlatform.includes("오늘의집")) {
      return "bg-gradient-to-br from-sky-400 to-sky-600 text-white";
    } else if (cleanPlatform.includes("11번가")) {
      return "bg-gradient-to-br from-pink-500 to-red-500 text-white";
    }

    return "bg-gradient-to-br from-gray-400 to-gray-600 text-white";
  };

  return (
    <span
      className={`inline-block flex-shrink-0 rounded-md px-2 py-1 text-xs font-medium ${getPlatformStyle(platform)}`}
    >
      {platform}
    </span>
  );
};
