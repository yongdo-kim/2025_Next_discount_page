import MenuTabClient from "@/components/navbar/menuTab/MenuTabClient";
import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
import { container } from "@/lib/di/dependencies";
import { unstable_cache } from "next/cache";

// ISR을 위한 캐시된 카테고리 데이터 함수
const getCachedCategories = unstable_cache(
  async (): Promise<CategoryEntity[]> => {
    try {
      const categories = await container.categoryService.getCategories();
      return JSON.parse(JSON.stringify(categories));
    } catch {
      return [];
    }
  },
  ['menu-tab-categories'],
  {
    revalidate: 3600, // 1시간마다 재검증
    tags: ['categories']
  }
);

export default async function MenuTabServer() {
  // ISR로 캐시된 카테고리 데이터 가져오기
  const categories = await getCachedCategories();

  return <MenuTabClient categories={categories} />;
}
