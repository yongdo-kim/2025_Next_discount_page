"use client";

import CarouselBox from "@/components/ui/CarouselBox";
import { useCategoryPostPreviews } from "@/features/posts/presentation/hooks/use-posts";

export default function CategoryCarouselClient() {
  const { data: posts = [] } = useCategoryPostPreviews();
  if (!posts || posts.length === 0) return null;

  return (
    <div className="container mx-auto px-6 pb-6">
      <CarouselBox data={posts.filter((result) => result !== null)} />
    </div>
  );
}
