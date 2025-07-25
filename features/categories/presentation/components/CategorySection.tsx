"use client";
import { Divider } from "@/components/ui/divider";
import CategoryDiscountArea from "@/features/categories/presentation/components/CategoryDiscountArea";
import NewCategoryDiscountArea from "@/features/categories/presentation/components/CategoryNewArea";
import CategoryRandomArea from "@/features/categories/presentation/components/CategoryRandomArea";
import PostListArea from "@/features/posts/presentation/components/PostListArea";
import { usePostPreviews } from "@/features/posts/presentation/hooks/use-posts";
import { useSearchParams } from "next/navigation";
import { useFetchCategories } from "../hooks/use-fetch-categories";

export default function CategorySection() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("category");

  const { data: categories } = useFetchCategories();
  const selectedCategory = categories?.find(
    (category) => category.id === Number(selectedId),
  );

  const { data: previews } = usePostPreviews({
    req: { categoryId: selectedCategory?.id || null, limit: null },
    enabled: !!selectedCategory,
  });

  return (
    <section className="mx-auto max-w-screen-lg flex-1">
      <>
        {selectedId ? (
          // 선택된 카테고리만 보여주는 UI
          <PostListArea previews={previews || []} />
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
