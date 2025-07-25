import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
import { CategoryRepository } from "@/features/categories/domain/repositories/category.repository";

//복수의 useCase 추가 가능
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.getCategories();
    return categories;
  }
}
