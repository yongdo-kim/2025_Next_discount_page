"use client";
import { Divider } from "@/components/ui/divider";
import CategoryDiscountArea from "@/features/category/presentation/components/category-discount-area";
import NewCategoryDiscountArea from "@/features/category/presentation/components/category-new-area";
import CategoryRandomArea from "@/features/category/presentation/components/category-random-area";
import PostListItem from "@/features/post/presentation/components/post-list-item";
import { usePostPreviews } from "@/features/post/presentation/hooks/use-posts";
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
    req: { categoryId: selectedCategory?.id },
    enabled: !!selectedCategory,
  });

  return (
    <div className="lg:flex lg:flex-row">
      <section className="mx-auto max-w-screen-xl">
        <div className="flex flex-col">
          {selectedId ? (
            // 선택된 카테고리만 보여주는 UI
            <div>
              {previews?.map((preview) => (
                <PostListItem key={preview.id} post={preview} />
              ))}
            </div>
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
        </div>
      </section>
    </div>
  );
}
