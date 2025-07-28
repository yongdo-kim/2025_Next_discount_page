import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import CategorySectionClient from "@/features/categories/presentation/components/section/CategorySectionClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function CategorySectionServer() {
  const categories = await queryClient
    .fetchQuery({
      queryKey: [categoryKeys.all],
      queryFn: async () => {
        const categories = await container.categoryService.getCategories();
        return JSON.parse(JSON.stringify(categories));
      },
    })
    .catch(() => [] as CategoryEntity[]);

  //해당 카테고리별 리스트 //http://localhost:3000/?category=1
  const prefetches = [
    ...(categories?.map((category: CategoryEntity) =>
      queryClient.prefetchQuery({
        queryKey: [categoryKeys.postPreviews(category.id, null)],
        queryFn: async () => {
          const posts = await container.postService.getPostPreviews({
            req: { limit: 8, categoryId: category.id },
          });
          return JSON.parse(JSON.stringify(posts));
        },
      }),
    ) || []),
  ];

  await Promise.all(prefetches);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategorySectionClient />
    </HydrationBoundary>
  );
}
