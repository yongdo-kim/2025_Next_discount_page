import MenuTab from "@/components/navbar/MenuTab";
import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import CategoryCarousel from "@/features/categories/presentation/components/CategoryCarousel";
import CategorySection from "@/features/categories/presentation/components/CategorySection";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Page() {
  const categories = await queryClient
    .fetchQuery({
      queryKey: [categoryKeys.all],
      queryFn: async () => {
        const categories = await container.categoryService.getCategories();
        return JSON.parse(JSON.stringify(categories));
      },
    })
    .catch(() => [] as CategoryEntity[]);

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
      <CategoryCarousel />
      {/* 메뉴탭 : 데스크탑인 경우 양옆, 모바일이라면 세로.  */}
      <div className="container mx-auto lg:flex">
        <MenuTab />
        <CategorySection />
      </div>
    </HydrationBoundary>
  );
}
