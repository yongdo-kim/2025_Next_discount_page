import { CategoryEntity } from "../entities/category.entity";

export interface CategoryRepository {
  getCategories(query?: string): Promise<CategoryEntity[]>;
}
