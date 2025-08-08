"use client";
import DividerLine from "@/components/ui/DividerLine";
import NewCategoryDiscountArea from "@/features/categories/presentation/components/CategoryNewArea";
import CategoryRandomArea from "@/features/categories/presentation/components/CategoryRandomArea";
import { useFetchCategories } from "@/features/categories/presentation/hooks/use-fetch-categories";
import PostListArea from "@/features/posts/presentation/components/PostListArea";
import { useSearchParams } from "next/navigation";
import { Suspense, lazy, useEffect, useState } from "react";

const LazyCategoryDiscountArea = lazy(() => import("@/features/categories/presentation/components/CategoryDiscountArea"));

export default function CategorySectionClient() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("category");
  const [showLazyContent, setShowLazyContent] = useState(false);

  const { data: categories } = useFetchCategories();
  const selectedCategory = categories?.find(
    (category) => category.id === Number(selectedId),
  );

  useEffect(() => {
    // 초기 컨텐츠가 렌더링된 후 지연 컨텐츠 로딩
    const timer = setTimeout(() => {
      setShowLazyContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mx-auto max-w-screen-lg flex-1">
      <>
        {selectedId ? (
          // 선택된 카테고리만 보여주는 UI
          <PostListArea
            categoryId={selectedCategory?.id || null}
            categoryName={selectedCategory?.name}
          />
        ) : (
          // 전체 UI
          <>
            <NewCategoryDiscountArea />
            <DividerLine />
            <CategoryRandomArea />
            <DividerLine />
            {showLazyContent && (
              <Suspense fallback={<div className="h-20 animate-pulse bg-gray-100 rounded" />}>
                <LazyCategoryDiscountArea />
              </Suspense>
            )}
          </>
        )} 
      </>
    </section>
  );
}
