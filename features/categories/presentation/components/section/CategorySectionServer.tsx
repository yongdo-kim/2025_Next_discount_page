import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import CategorySectionClient from "@/features/categories/presentation/components/section/CategorySectionClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function CategorySectionServer() {
  // 카테고리 데이터 먼저 가져오기
  const categories = await queryClient
    .fetchQuery({
      queryKey: [categoryKeys.all],
      queryFn: async () => {
        const categories = await container.categoryService.getCategories();
        return JSON.parse(JSON.stringify(categories));
      },
    })
    .catch(() => [] as CategoryEntity[]);

  // 카테고리별 포스트 프리뷰와 배너 데이터 프리페치
  const prefetches = [
    ...(categories?.map((category: CategoryEntity) =>
      queryClient.prefetchQuery({
        queryKey: [categoryKeys.detail(category.id, null)],
        queryFn: async () => {
          const posts = await container.postService.getPostPreviews({
            req: { categoryId: category.id, limit: null },
          });
          return JSON.parse(JSON.stringify(posts));
        },
      }),
    ) || []),
    queryClient.prefetchQuery({
      queryKey: [categoryKeys.banners],
      queryFn: async () => {
        const posts = await container.postService.getCategoryPostPreviews();
        return JSON.parse(JSON.stringify(posts));
      },
    }),
    queryClient.prefetchQuery({
      queryKey: [categoryKeys.detail(null, 8)],
      queryFn: async () => {
        const posts = await container.postService.getPostPreviews({
          req: { limit: 8, categoryId: null },
        });
        return JSON.parse(JSON.stringify(posts));
      },
    }),
  ];

  await Promise.all(prefetches);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategorySectionClient />
    </HydrationBoundary>
  );
}