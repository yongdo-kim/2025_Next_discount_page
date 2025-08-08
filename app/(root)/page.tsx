import MenuTabServer from "@/components/navbar/menuTab/MenuTabServer";
import CategoryCarouselServer from "@/features/categories/presentation/components/carousel/CategoryCarouselServer";
import CategorySectionServer from "@/features/categories/presentation/components/section/CategorySectionServer";
import { Suspense } from "react";

export const revalidate = 3600; // 1시간마다 ISR

export default async function Page() {
  return (
    <>
      {/* 카테고리 캐러셀과 메뉴탭을 함께 로딩 */}
      <Suspense fallback={null}>
        <CategoryCarouselServer />
        {/* 메뉴탭 : 데스크탑인 경우 양옆, 모바일이라면 세로.  */}
        <div className="container mx-auto lg:flex">
          <MenuTabServer />
          <CategorySectionServer />
        </div>
      </Suspense>
    </>
  );
}
