import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";

export interface CategoryRepository {
  getCategories(query?: string): Promise<CategoryEntity[]>;
}
