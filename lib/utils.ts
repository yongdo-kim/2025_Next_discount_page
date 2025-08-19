import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToMMDD(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return format(date, "M월 d일");
  } catch {
    return dateString;
  }
}

export function splitTitleByPlatform(title: string): {
  platform: string | null;
  content: string;
} {
  const platformMatch = title.match(/\[.*?\]/);
  if (platformMatch) {
    const platform = platformMatch[0];
    const content = title.replace(/\[.*?\]\s*/, "").trim();
    return { platform, content };
  }
  return { platform: null, content: title };
}
