import CategoryCarousel from "@/features/categories/presentation/components/carousel/CategoryCarouselClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { captureException } from "@sentry/nextjs";
import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";

export default async function CategoryCarouselServer() {
  try {
    await queryClient.prefetchQuery({
      queryKey: [categoryKeys.carousel],
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
