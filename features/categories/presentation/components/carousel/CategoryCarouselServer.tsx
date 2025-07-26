import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import CategoryCarousel from "@/features/categories/presentation/components/carousel/CategoryCarouselClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function CategoryCarouselServer() {
  // 카테고리 포스트 프리뷰 데이터 프리페치
  await queryClient
    .fetchQuery({
      queryKey: [categoryKeys.banners],
      queryFn: async () => {
        const posts = await container.postService.getCategoryPostPreviews();
        return JSON.parse(JSON.stringify(posts));
      },
    })
    .catch(() => []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryCarousel />
    </HydrationBoundary>
  );
}