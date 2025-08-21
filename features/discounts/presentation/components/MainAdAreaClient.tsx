"use client";

import { useNewestDiscountPreviews } from "@/features/discounts/presentation/hooks/use-fetch-discounts";
import { useFetchEventsUpcoming } from "@/features/events/presentation/hooks/use-event-upcoming";
import { postKeys } from "@/features/posts/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ImageOverlay } from "./ImageOverlay";

export const MainAdAreaClient = () => {
  const { data: discounts, isError: isDiscountError } =
    useNewestDiscountPreviews();

  const { data: events, isError: isEventError } = useFetchEventsUpcoming(8);

  if (isDiscountError || isEventError) {
    return null;
  }
  if (!discounts || !events) {
    return null;
  }

  const leftImage = events?.[0]?.ogImage;
  const leftEvent = events?.[0];

  const rightItems = [
    ...(discounts?.slice(0, 2).map((d) => ({
      image: d.imageUrl,
      title: d.title,
      type: "discount" as const,
      postId: d.id,
      storeName: d.storeName,
    })) || []),
    ...(events?.slice(1, 3).map((e) => ({
      image: e.ogImage,
      title: e.title,
      type: "event" as const,
      postId: e.postId,
    })) || []),
  ];

  const handlePrefetch = (postId: number) => {
    queryClient.prefetchQuery({
      queryKey: postKeys.detail(postId),
      queryFn: () => container.postService.getPostDetail(postId),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid h-96 grid-cols-2 gap-4">
        {/* Left side - Event image */}
        <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-200">
          {leftImage ? (
            <Link
              href={`/posts/${leftEvent?.postId}`}
              onMouseEnter={() => handlePrefetch(leftEvent?.postId)}
            >
              <Image
                src={leftImage}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <ImageOverlay
                title={leftEvent?.title || "이벤트"}
                subtitle="이벤트"
                isLarge={true}
              />
            </Link>
          ) : (
            <>
              {/* Event icon for missing image */}
              <Link
                href={`/posts/${leftEvent?.postId}`}
                onMouseEnter={() => handlePrefetch(leftEvent?.postId)}
              >
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
                  <Calendar size={64} className="text-purple-600" />
                </div>
                <ImageOverlay
                  title={leftEvent?.title || "이벤트"}
                  subtitle="이벤트"
                  isLarge={true}
                />
              </Link>
            </>
          )}
        </div>

        {/* Right side - 2x2 grid for discounts and other events */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {[0, 1, 2, 3].map((index) => {
            const item = rightItems[index];
            return (
              <div
                key={index}
                className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-200"
              >
                {item && item.image ? (
                  <Link
                    href={`/posts/${item.postId}`}
                    onMouseEnter={() => handlePrefetch(item.postId)}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <ImageOverlay
                      title={item.title}
                      subtitle={
                        item.type === "discount"
                          ? item.storeName || "할인"
                          : "이벤트"
                      }
                    />
                  </Link>
                ) : item ? (
                  <Link
                    href={`/posts/${item.postId}`}
                    onMouseEnter={() => handlePrefetch(item.postId)}
                  >
                    <Image
                      src="/discount-character-1024.webp"
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <ImageOverlay
                      title={item.title}
                      subtitle={
                        item.type === "discount"
                          ? item.storeName || "할인"
                          : "이벤트"
                      }
                    />
                  </Link>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                    <span>정보 없음</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
