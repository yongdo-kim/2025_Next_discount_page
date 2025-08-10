"use client";
import DividerLine from "@/components/ui/DividerLine";
import NewCategoryDiscountArea from "@/features/categories/presentation/components/CategoryNewArea";
import CategoryRandomArea from "@/features/categories/presentation/components/CategoryRandomArea";
import { useFetchCategories } from "@/features/categories/presentation/hooks/use-fetch-categories";
import PostListArea from "@/features/posts/presentation/components/PostListArea";
import { useSearchParams } from "next/navigation";
import { Suspense, lazy, useEffect, useState } from "react";

const LazyCategoryDiscountArea = lazy(
  () =>
    import(
      "@/features/categories/presentation/components/CategoryDiscountArea"
    ),
);

export default function CategorySectionClient() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("category");
  const [showLazyContent, setShowLazyContent] = useState(false);

  const { data: categories } = useFetchCategories();
  const selectedCategory = categories?.find(
    (category) => category.id === Number(selectedId),
  );

  useEffect(() => {
    // 컴포넌트 마운트 후 즉시 지연 콘텐츠 로딩
    setShowLazyContent(true);
  }, []);

  return (
    <section className="flex-1">
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
              <Suspense fallback={null}>
                <LazyCategoryDiscountArea />
              </Suspense>
            )}
          </>
        )}
      </>
    </section>
  );
}
