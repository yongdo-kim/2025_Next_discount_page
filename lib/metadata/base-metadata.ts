import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";

export function createBaseMetadata(): Metadata {
  return {
    title: {
      default: APP_NAME,
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
    metadataBase: new URL(SERVER_URL),
    icons: {
      icon: "/favicon.ico",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: SERVER_URL,
      title: APP_NAME,
      description: APP_DESCRIPTION,
      siteName: APP_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: APP_NAME,
      description: APP_DESCRIPTION,
    },
  };
}

export function createPageMetadata(
  title: string,
  description?: string,
  imageUrl?: string
): Metadata {
  return {
    title,
    description: description || APP_DESCRIPTION,
    openGraph: {
      title,
      description: description || APP_DESCRIPTION,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || APP_DESCRIPTION,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}