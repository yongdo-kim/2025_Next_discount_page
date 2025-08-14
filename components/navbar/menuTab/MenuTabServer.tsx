import MenuTabClient from "@/components/navbar/menuTab/MenuTabClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { captureException } from "@sentry/nextjs";

export default async function MenuTabServer() {
  // 카테고리 데이터를 prefetch (실패해도 괜찮음)
  try {
    await queryClient.prefetchQuery({
      queryKey: ["categories"],
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
