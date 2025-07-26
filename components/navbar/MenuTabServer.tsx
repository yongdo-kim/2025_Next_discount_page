import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import MenuTabClient from "./MenuTabClient";

export default async function MenuTabServer() {
  // 카테고리 데이터 프리페치
  const categories = await queryClient
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
      <MenuTabClient categories={categories} />
    </HydrationBoundary>
  );
}