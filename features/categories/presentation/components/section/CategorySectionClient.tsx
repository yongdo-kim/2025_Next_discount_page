"use client";
import { Divider } from "@/components/ui/divider";
import CategoryDiscountArea from "@/features/categories/presentation/components/CategoryDiscountArea";
import NewCategoryDiscountArea from "@/features/categories/presentation/components/CategoryNewArea";
import CategoryRandomArea from "@/features/categories/presentation/components/CategoryRandomArea";
import { useFetchCategories } from "@/features/categories/presentation/hooks/use-fetch-categories";
import PostListArea from "@/features/posts/presentation/components/PostListArea";
import { useSearchParams } from "next/navigation";

export default function CategorySectionClient() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("category");

  const { data: categories } = useFetchCategories();
  const selectedCategory = categories?.find(
    (category) => category.id === Number(selectedId),
  );


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
            <Divider />
            <CategoryRandomArea />
            <Divider />
            <CategoryDiscountArea />
          </>
        )}
      </>
    </section>
  );
}
