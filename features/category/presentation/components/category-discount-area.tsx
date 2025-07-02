"use client";

import MainTitle from "@/components/main-title";
import { Divider } from "@/components/ui/divider";
import { useFetchCategories } from "@/features/category/presentation/hooks/use-fetch-categories";
import PostPreviewCategoryArea from "../../../post/presentation/components/post-preview-category";

export default function CategoryDiscountArea() {
  const { data: categories } = useFetchCategories();

  return (
    <section className="pt-8 pb-2">
      <div className="flex justify-between px-4 pb-4">
        <MainTitle
          title="테마별"
          coloredTitle=" 할인"
          color="text-emerald-500"
        />
      </div>

      {categories?.map((category) => (
        <div key={category.id}>
          <PostPreviewCategoryArea
            categoryId={category.id}
            title={category.name}
          />
          <Divider className="mt-8 mb-8" />
        </div>
      ))}
    </section>
  );
}
