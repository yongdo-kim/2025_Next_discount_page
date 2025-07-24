"use client";

import MainTitle from "@/components/MainTitle";
import { useFetchCategories } from "@/features/categories/presentation/hooks/use-fetch-categories";
import PostPreviewCategoryArea from "@/features/posts/presentation/components/PostPreviewCategory";

export default function CategoryDiscountArea() {
  const { data: categories } = useFetchCategories();

  if (!categories || categories.length === 0) return null;

  return (
    <section className="pt-8 pb-2 md:pt-8 md:pb-8">
      <div className="flex justify-between px-4 pt-4 pb-4">
        <MainTitle
          title="테마별"
          coloredTitle=" 할인"
          color="text-emerald-500"
        />
      </div>

      {categories.map((category) => (
        <div key={category.id}>
          <PostPreviewCategoryArea
            categoryId={category.id}
            title={category.name}
          />
        </div>
      ))}
    </section>
  );
}
