import { TagEntity } from "../../domain/entities/tag.entity";
import { TagRepository } from "../../domain/repositories/tag.repository";

export class MockTagRepository implements TagRepository {
  //임시로 작업중.
  private mockTags: TagEntity[] = [
    new TagEntity({
      id: 1,
      name: "테스트 태그 1",
    }),
    new TagEntity({
      id: 2,
      name: "테스트 태그 2",
    }),
    new TagEntity({
      id: 3,
      name: "테스트 태그 3",
    }),
  ];

  async getTags(path: string, query?: string): Promise<TagEntity[]> {
    // 간단한 검색 기능 구현 (선택사항)
    if (query) {
      const searchTerm = query.toLowerCase();
      return this.mockTags.filter((tag) =>
        tag.name.toLowerCase().includes(searchTerm),
      );
    }
    return this.mockTags;
  }
}
