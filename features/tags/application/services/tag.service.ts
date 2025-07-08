import { TagEntity } from "../../domain/entities/tag.entity";
import { TagRepository } from "../../domain/repositories/tag.repository";

//복수의 useCase 추가 가능
export class TagService {
  constructor(private tagRepository: TagRepository) {}

  async getTags(): Promise<TagEntity[]> {
    const tags = await this.tagRepository.getTags("/tags");
    return tags;
  }
}
