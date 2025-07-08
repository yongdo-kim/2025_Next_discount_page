import { CategoryEntity } from "../../domain/entities/category.entity";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { categoryApi } from "../api/category.api";

export class HttpCategoryRepository implements CategoryRepository {
  async getCategories(query?: string): Promise<CategoryEntity[]> {
    const categories = await categoryApi.getCategories(query);
    return categories.map(
      (category) =>
        new CategoryEntity({
          id: category.id,
          name: category.name,
        }),
    );
  }
}
