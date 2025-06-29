import { CategoryEntity } from "../entities/category.entity";

export interface CategoryRepository {
  getCategories(path: string, query?: string): Promise<CategoryEntity[]>;
}
