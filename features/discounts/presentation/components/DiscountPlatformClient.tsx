"use client";

import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { ShoppingBagIcon } from "@/components/ui/ShoppingBagIcon";
import { useFetchDiscountPlatforms } from "@/features/discounts/presentation/hooks/use-fetch-discount-platforms";
import { isClientError } from "@/lib/error-handler";
import Image from "next/image";
import { useState } from "react";

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
        hover: "hover:bg-yellow-100",
        selected:
          "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border-yellow-500",
      },
    },
    {
      key: "coupang",
      name: "쿠팡",
      colors: {
        bg: "bg-red-50 text-red-700 border-red-200",
        hover: "hover:bg-red-100",
        selected:
          "bg-gradient-to-br from-red-500 to-red-700 text-white border-red-500",
      },
    },
    {
      key: "naver",
      name: "네이버",
      colors: {
        bg: "bg-green-50 text-green-700 border-green-200",
        hover: "hover:bg-green-100",
        selected:
          "bg-gradient-to-br from-green-500 to-green-700 text-white border-green-500",
      },
    },
    {
      key: "ohouse",
      name: "오늘의집",
      colors: {
        bg: "bg-sky-50 text-sky-700 border-sky-200",
        hover: "hover:bg-sky-100",
        selected:
          "bg-gradient-to-br from-sky-400 to-sky-600 text-white border-sky-500",
      },
    },
    {
      key: "gmarket",
      name: "G마켓",
      colors: {
        bg: "bg-gray-50 text-gray-700 border-gray-200",
        hover: "hover:bg-gray-100",
        selected:
          "bg-gradient-to-br from-gray-400 to-gray-600 text-white border-gray-500",
      },
    },
  ];

  const getFilteredPlatforms = () => {
    return platforms?.[selectedTab] ? [platforms[selectedTab]] : [];
  };

  if (isLoading) return <div>Loading...</div>;

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
              className={`rounded-full border px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedTab === tab.key
                  ? tab.colors.selected
                  : `${tab.colors.bg} ${tab.colors.hover}`
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      {/* 리스트 아이템 */}
      <div className="mt-4 px-4">
        {getFilteredPlatforms().map((posts, index) => (
          <div key={index} className="space-y-4">
            {posts?.map((post) => (
              <div
                key={post.id}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>조회수: {post.views.toLocaleString()}</span>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                {post.postImages.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Image
                      key={post.postImages[0]}
                      src={post.postImages[0]}
                      alt={post.title}
                      width={200}
                      height={200}
                      className="h-32 w-full rounded object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {isError && isClientError(error) && (
        <ErrorState error={error} onRetry={refetch} size="sm" />
      )}
    </section>
  );
}
