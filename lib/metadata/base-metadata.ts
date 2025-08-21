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
      images: [
        {
          url: "/discount-character.webp",
          width: 1200,
          height: 630,
          alt: APP_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: APP_NAME,
      description: APP_DESCRIPTION,
      images: ["/discount-character.webp"],
    },
  };
}

export function createPageMetadata(
  title: string,
  description?: string,
  imageUrl?: string,
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
