"use client";

import Carousel from "@/components/ui/carousel";
import { usePostPreviews } from "@/features/post/presentation/hooks/use-posts";
import "swiper/css";
import "swiper/css/pagination";

export default function PostCarousel() {
  const { data: posts } = usePostPreviews({ req: { category: "new", limit: 5 } });

  if (!posts) return null;
  const data = posts.map((post) => ({
    title: post.title,
    thumbnailUrl: post.thumbnailUrl,
  }));

  return <Carousel data={data} />;
}
