import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import CategoryCarousel from "@/features/categories/presentation/components/CategoryCarousel";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function CategoryCarouselServer() {
  // 카테고리 데이터만 프리페치
  await queryClient
    .fetchQuery({
      queryKey: [categoryKeys.all],
      queryFn: async () => {
        const categories = await container.categoryService.getCategories();
        return JSON.parse(JSON.stringify(categories));
      },
    })
    .catch(() => [] as CategoryEntity[]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryCarousel />
    </HydrationBoundary>
  );
}