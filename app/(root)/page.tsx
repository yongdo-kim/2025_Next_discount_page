import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicMenuTabServer = dynamic(
  () => import("@/components/navbar/menuTab/MenuTabServer"),
  {
    loading: () => null,
  },
);

const DynamicCategorySectionServer = dynamic(
  () =>
    import(
      "@/features/categories/presentation/components/section/CategorySectionServer"
    ),
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
        <div className="container mx-auto lg:flex">
          <DynamicMenuTabServer />
          <DynamicCategorySectionServer />
        </div>
      </Suspense>
    </>
  );
}
