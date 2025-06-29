"use client";

import { useFetchCategories } from "@/features/category/presentation/hooks/use-fetch-categories";
import PostPreviewCategoryArea from "../../../post/presentation/components/post-preview-category";

export default function CategoryDiscountArea() {
  const { data: categories } = useFetchCategories();

  return (
    <section className="pt-4 pb-2 pl-8">
      <div className="flex pb-2 text-lg font-bold lg:text-3xl">
        <div>테마별 </div>
        <div className="px-2 text-green-400">할인</div>
      </div>
      {categories?.map((category) => (
        <PostPreviewCategoryArea
          key={category.id}
          categoryId={category.id}
          title={category.name}
        />
      ))}
    </section>
  );
}
