"use client";

import CarouselBox from "@/components/ui/CarouselBox";
import { useCategoryPostPreviews } from "@/features/posts/presentation/hooks/use-posts";
import "swiper/css";
import "swiper/css/pagination";

export default function CategoryCarouselClient() {
  const { data: posts } = useCategoryPostPreviews();

  if (!posts) return null;

  return (
    <div className="container mx-auto pb-8">
      <CarouselBox data={posts.filter((result) => result !== null)} />
    </div>
  );
}
