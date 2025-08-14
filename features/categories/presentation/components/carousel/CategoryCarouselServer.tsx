import CategoryCarousel from "@/features/categories/presentation/components/carousel/CategoryCarouselClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { captureException } from "@sentry/nextjs";

export default async function CategoryCarouselServer() {
  // 카테고리 포스트 데이터를 prefetch (실패해도 괜찮음)
  try {
    await queryClient.prefetchQuery({
      queryKey: ["category-carousel-posts"],
      queryFn: async () => {
        const posts = await container.postService.getCategoryPostPreviews();
        return JSON.parse(JSON.stringify(posts));
      },
    });
  } catch (error) {
    captureException(error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryCarousel />
    </HydrationBoundary>
  );
}
