import MenuTabServer from "@/components/navbar/menuTab/MenuTabServer";
import CategoryCarouselServer from "@/features/categories/presentation/components/carousel/CategoryCarouselServer";
import CategorySectionServer from "@/features/categories/presentation/components/section/CategorySectionServer";
import CategoryCarouselSkeleton from "@/components/skeletons/CategoryCarouselSkeleton";
import CategorySectionSkeleton from "@/components/skeletons/CategorySectionSkeleton";
import MenuTabSkeleton from "@/components/skeletons/MenuTabSkeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      {/* 카테고리 캐러셀을 독립적으로 스트리밍 */}
      <Suspense fallback={<CategoryCarouselSkeleton />}>
        <CategoryCarouselServer />
      </Suspense>

      {/* 메뉴탭 : 데스크탑인 경우 양옆, 모바일이라면 세로.  */}
      <div className="container mx-auto lg:flex">
        <Suspense fallback={<MenuTabSkeleton />}>
          <MenuTabServer />
        </Suspense>
        {/* 카테고리 섹션을 독립적으로 스트리밍 */}
        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySectionServer />
        </Suspense>
      </div>
    </>
  );
}
