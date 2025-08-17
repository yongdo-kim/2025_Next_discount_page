import MenuTabClient from "@/components/navbar/menuTab/MenuTabClient";
import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { captureException } from "@sentry/nextjs";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function MenuTabServer() {
  // 카테고리 데이터를 prefetch (실패해도 괜찮음)
  try {
    await queryClient.prefetchQuery({
      queryKey: [categoryKeys.all],
      queryFn: async () => {
        const categories = await container.categoryService.getCategories();
        return JSON.parse(JSON.stringify(categories));
      },
    });
  } catch (error) {
    captureException(error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MenuTabClient />
    </HydrationBoundary>
  );
}
