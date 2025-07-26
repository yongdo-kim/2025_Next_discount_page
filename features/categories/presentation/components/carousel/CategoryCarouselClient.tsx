"use client";

import Carousel from "@/components/ui/carousel";
import { useCategoryPostPreviews } from "@/features/posts/presentation/hooks/use-posts";
import "swiper/css";
import "swiper/css/pagination";

export default function CategoryCarouselClient() {
  const { data: posts } = useCategoryPostPreviews();

  if (!posts) return null;

  return (
    <div className="container mx-auto px-4 pb-8 md:px-4 lg:px-16">
      <Carousel data={posts.filter((result) => result !== null)} />
    </div>
  );
}
