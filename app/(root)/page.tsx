import DividerLine from "@/components/ui/DividerLine";
import { MainAdBanners } from "@/features/banners/presentation/components/MainAdBanners";
import DiscountPlatformServer from "@/features/discounts/presentation/components/DiscountPlatformServer";
import MainAdAreaServer from "@/features/discounts/presentation/components/MainAdAreaServer";
import NewestDiscountServer from "@/features/discounts/presentation/components/NewestDiscountServer";
import EventsLatestServer from "@/features/events/presentation/components/EventsLatestServer";
import EventsUpComingServer from "@/features/events/presentation/components/EventsUpComingServer";
import PostsByCategoryServer from "@/features/posts/presentation/components/PostsByCategoryServer";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicMenuTabServer = dynamic(
  () => import("@/components/navbar/menuTab/MenuTabServer"),
  {
    loading: () => null,
  },
);

export const revalidate = 3600; // 1시간마다 ISR

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;

  return (
    <>
      {/* 카테고리 캐러셀과 메뉴탭을 함께 로딩 */}
      <Suspense fallback={null}>
        {/* 메뉴탭 : 데스크탑인 경우 양옆, 모바일이라면 세로.  */}
        <div className="container mx-auto">
          <DynamicMenuTabServer />
          <DividerLine className="my-4" />

          {category ? (
            /* 카테고리가 있는 경우의 UI */
            <PostsByCategoryServer categoryId={category} />
          ) : (
            /* 기본 홈페이지 UI */
            <>
              <MainAdAreaServer />
              <section className="grid grid-cols-1 md:grid-cols-2">
                <NewestDiscountServer />
                <EventsUpComingServer />
              </section>
              <DividerLine />
              {/* 메인 배너 */}
              <div className="px-4">
                <MainAdBanners />
              </div>
              {/* 추천 포스트 */}
              <EventsLatestServer />
              <DividerLine />
              {/* 플랫폼별 할인 */}
              <DiscountPlatformServer />
            </>
          )}
        </div>
      </Suspense>
    </>
  );
}
