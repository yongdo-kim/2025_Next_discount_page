"use client";

import Carousel from "@/components/ui/carousel";
import { useCategoryPostPreviews } from "@/features/post/presentation/hooks/use-posts";
import "swiper/css";
import "swiper/css/pagination";

export default function CategoryCarousel() {
  const { data: posts } = useCategoryPostPreviews();

  if (!posts) return null;

  return (
    <div className="mx-auto max-w-screen-xl px-4 pb-8 md:px-4 lg:px-16">
      <Carousel data={posts.filter((result) => result !== null)} />
    </div>
  );
}
