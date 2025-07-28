"use client";

import Carousel from "@/components/ui/carousel";
import { useCategoryPostPreviews } from "@/features/posts/presentation/hooks/use-posts";
import "swiper/css";
import "swiper/css/pagination";

export default function CategoryCarouselClient() {
  const { data: posts } = useCategoryPostPreviews();

  if (!posts) return null;

  return (
    <div className="container mx-auto pb-8">
      <Carousel data={posts.filter((result) => result !== null)} />
    </div>
  );
}
