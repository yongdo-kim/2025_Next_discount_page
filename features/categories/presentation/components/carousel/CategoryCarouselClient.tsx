"use client";

import CarouselBox from "@/components/ui/CarouselBox";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";

type CategoryCarouselClientProps = {
  posts: PostPreviewEntity[];
};

export default function CategoryCarouselClient({
  posts,
}: CategoryCarouselClientProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="container mx-auto pb-8">
      <CarouselBox data={posts.filter((result) => result !== null)} />
    </div>
  );
}
