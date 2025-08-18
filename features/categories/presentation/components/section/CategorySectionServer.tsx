import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import CategorySectionClient from "@/features/categories/presentation/components/section/CategorySectionClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function CategorySectionServer() {
  // 초기 렌더링에 필요한 데이터들을 병렬로 prefetch
  const prefetches = [
    // 카테고리 목록
    queryClient
      .fetchQuery({
        queryKey: [categoryKeys.all],
        queryFn: async () => {
          const categories = await container.categoryService.getCategories();
          return JSON.parse(JSON.stringify(categories));
        },
      })
      .catch(() => [] as CategoryEntity[]),

    // NewCategoryDiscountArea용 데이터 (오늘의 따끈한 할인)
    queryClient
      .fetchQuery({
        queryKey: [categoryKeys.hotDeals],
        queryFn: async () => {
          const posts = await container.postService.getPostPreviews({
            req: { limit: 8, categoryId: null },
          });
          return JSON.parse(JSON.stringify(posts));
        },
      })
      .catch(() => []),

    // CategoryRandomArea용 데이터 (테마별 특가 추천)
    queryClient
      .fetchQuery({
        queryKey: [categoryKeys.banners],
        queryFn: async () => {
          const posts = await container.postService.getCategoryPostPreviews();
          return JSON.parse(JSON.stringify(posts));
        },
      })
      .catch(() => []),
  ];

  await Promise.all(prefetches);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategorySectionClient />
    </HydrationBoundary>
  );
}
