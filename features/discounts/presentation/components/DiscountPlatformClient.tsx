"use client";

import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { useFetchDiscountPlatforms } from "@/features/discounts/presentation/hooks/use-fetch-discount-platforms";
import { isClientError } from "@/lib/error-handler";
import { ShoppingBagIcon } from "lucide-react";
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

  const platformTabs: { key: PlatformKey; name: string }[] = [
    { key: "kakao", name: "카카오" },
    { key: "coupang", name: "쿠팡" },
    { key: "naver", name: "네이버" },
    { key: "ohouse", name: "오늘의집" },
    { key: "gmarket", name: "G마켓" },
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
              className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedTab === tab.key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

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
