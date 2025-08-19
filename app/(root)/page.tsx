import DividerLine from "@/components/ui/DividerLine";
import NewestDiscountServer from "@/features/discounts/presentation/components/NewestDiscountServer";
import EventsUpComingServer from "@/features/events/presentation/components/EventsUpComingServer";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicMenuTabServer = dynamic(
  () => import("@/components/navbar/menuTab/MenuTabServer"),
  {
    loading: () => null,
  },
);

export const revalidate = 3600; // 1시간마다 ISR

export default async function Page() {
  return (
    <>
      {/* 카테고리 캐러셀과 메뉴탭을 함께 로딩 */}
      <Suspense fallback={null}>
        {/* 메뉴탭 : 데스크탑인 경우 양옆, 모바일이라면 세로.  */}
        <div className="container mx-auto">
          <DynamicMenuTabServer />
          <DividerLine className="my-4" />
          <section className="grid grid-cols-2">
            <NewestDiscountServer />
            <EventsUpComingServer />
          </section>
          <DividerLine />
        </div>
      </Suspense>
    </>
  );
}
