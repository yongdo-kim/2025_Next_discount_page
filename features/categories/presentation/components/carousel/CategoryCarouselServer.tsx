import CategoryCarousel from "@/features/categories/presentation/components/carousel/CategoryCarouselClient";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { container } from "@/lib/di/dependencies";
import { unstable_cache } from "next/cache";

const getCachedCategoryPosts = unstable_cache(
  async (): Promise<PostPreviewEntity[]> => {
    try {
      const posts = await container.postService.getCategoryPostPreviews();
      return JSON.parse(JSON.stringify(posts));
    } catch (error) {
      console.error("Failed to fetch category posts:", error);
      return [];
    }
  },
  ["category-carousel-posts"],
  {
    revalidate: 3600, // 1시간마다 재검증
    tags: ["posts", "carousel"],
  },
);

export default async function CategoryCarouselServer() {
  const posts = await getCachedCategoryPosts();

  return <CategoryCarousel posts={posts} />;
}
