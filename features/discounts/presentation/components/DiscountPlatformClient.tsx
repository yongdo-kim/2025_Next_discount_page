"use client";

import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { Badge } from "@/components/shadcn/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { ShoppingBagIcon } from "@/components/ui/ShoppingBagIcon";
import SmartImage from "@/components/ui/SmartImage";
import { useFetchDiscountPlatforms } from "@/features/discounts/presentation/hooks/use-fetch-discount-platforms";
import { postKeys } from "@/features/posts/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { isClientError } from "@/lib/error-handler";
import { queryClient } from "@/lib/react-query";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale/ko";
import { useState } from "react";
import Link from "next/link";

type PlatformKey = "kakao" | "coupang" | "naver" | "ohouse" | "gmarket";

export default function DiscountPlatformClient() {
  const {
    data: platforms,
    error,
    isError,
    isLoading,
    refetch,
  } = useFetchDiscountPlatforms();

  const [selectedTab, setSelectedTab] = useState<PlatformKey>("kakao");

  const platformTabs: {
    key: PlatformKey;
    name: string;
    colors: { bg: string; hover: string; selected: string };
  }[] = [
    {
      key: "kakao",
      name: "카카오",
      colors: {
        bg: "bg-yellow-50 text-yellow-700 border-yellow-200",
        hover:
          "hover:text-white hover:border-yellow-400 hover:bg-gradient-to-br from-yellow-400 to-yellow-500 ",
        selected:
          "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border-yellow-500",
      },
    },
    {
      key: "coupang",
      name: "쿠팡",
      colors: {
        bg: "bg-red-50 text-red-700 border-red-200",
        hover:
          "hover:text-white hover:border-red-400 hover:bg-gradient-to-br from-red-400 to-red-500 ",
        selected:
          "bg-gradient-to-br from-red-500 to-red-700 text-white border-red-500",
      },
    },
    {
      key: "naver",
      name: "네이버",
      colors: {
        bg: "bg-green-50 text-green-700 border-green-200",
        hover:
          "hover:text-white hover:border-green-400 hover:bg-gradient-to-br from-green-400 to-green-500 ",
        selected:
          "bg-gradient-to-br from-green-500 to-green-700 text-white border-green-500",
      },
    },
    {
      key: "ohouse",
      name: "오늘의집",
      colors: {
        bg: "bg-sky-50 text-sky-700 border-sky-200",
        hover:
          "hover:text-white hover:border-sky-400 hover:bg-gradient-to-br from-sky-400 to-sky-500 ",
        selected:
          "bg-gradient-to-br from-sky-400 to-sky-600 text-white border-sky-500",
      },
    },
    {
      key: "gmarket",
      name: "G마켓",
      colors: {
        bg: "bg-gray-50 text-gray-700 border-gray-200",
        hover:
          "hover:text-white hover:border-gray-400 hover:bg-gradient-to-br from-gray-400 to-gray-500 ",
        selected:
          "bg-gradient-to-br from-gray-400 to-gray-600 text-white border-gray-500",
      },
    },
  ];

  const getFilteredPlatforms = () => {
    return platforms?.[selectedTab]?.slice(0, 8) || [];
  };

  const handlePrefetch = (postId: string) => {
    queryClient.prefetchQuery({
      queryKey: postKeys.detail(postId),
      queryFn: () => container.postService.getPostDetail(Number(postId)),
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError && isClientError(error))
    return <ErrorState error={error} onRetry={refetch} size="sm" />;

  return (
    <section className="pt-4 pb-2 md:pb-8">
      <div className={`flex justify-between px-4`}>
        <MainTitle
          title="테마별 할인"
          icon={<ShoppingBagIcon className="h-5 w-5" />}
        />
      </div>
      {/* 플랫폼 탭 */}
      <div className="mt-4 px-4">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto">
          {platformTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`rounded-full border-1 px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedTab === tab.key
                  ? tab.colors.selected
                  : `border-gray-300 bg-transparent text-gray-300 ${tab.colors.hover}`
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      {/* 리스트 아이템 */}
      <div className="mt-4 grid w-full grid-cols-4 gap-4 px-4">
        {getFilteredPlatforms().map((post) => {
          const createdAt = post.createdAt
            ? new Date(post.createdAt)
            : new Date();
          const timeAgo = formatDistanceToNow(createdAt, {
            addSuffix: true,
            locale: ko,
          });

          return (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              onMouseEnter={() => handlePrefetch(post.id.toString())}
            >
              <Card className="hover:bg-accent cursor-pointer p-4">
                <div className="flex items-center">
                  <Badge variant="outline" className="text-md">
                    {selectedTab === "kakao"
                      ? "카카오"
                      : selectedTab === "coupang"
                        ? "쿠팡"
                        : selectedTab === "naver"
                          ? "네이버"
                          : selectedTab === "ohouse"
                            ? "오늘의집"
                            : "G마켓"}
                  </Badge>
                </div>
                {post.postImages.length > 0 ? (
                  <SmartImage
                    src={post.postImages[0]}
                    className="aspect-video w-full rounded-xl object-cover"
                    alt={post.title}
                    width={300}
                    height={200}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                  />
                ) : (
                  <div className="aspect-video w-full rounded-xl bg-gray-200" />
                )}
                <CardHeader className="px-2">
                  <CardTitle className="line-clamp-2 text-lg font-bold whitespace-normal">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {/* 조회수: {post.views.toLocaleString()} */}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {timeAgo}
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
