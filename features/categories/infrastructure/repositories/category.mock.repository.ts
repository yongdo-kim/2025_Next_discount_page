import { CategoryEntity } from "../../domain/entities/category.entity";
import { CategoryRepository } from "../../domain/repositories/category.repository";

export class MockCategoryRepository implements CategoryRepository {
  //임시로 작업중.
  private mockCategories: CategoryEntity[] = [
    new CategoryEntity({
      id: 1,
      name: "테스트 태그 1",
    }),
    new CategoryEntity({
      id: 2,
      name: "테스트 태그 2",
    }),
    new CategoryEntity({
      id: 3,
      name: "테스트 태그 3",
    }),
  ];

  async getCategories(path: string, query?: string): Promise<CategoryEntity[]> {
    // 간단한 검색 기능 구현 (선택사항)
    if (query) {
      const searchTerm = query.toLowerCase();
      return this.mockCategories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm),
      );
    }
    return this.mockCategories;
  }
}
