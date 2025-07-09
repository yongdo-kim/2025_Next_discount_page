import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { TagRepository } from "@/features/tags/domain/repositories/tag.repository";
import { tagApi } from "@/features/tags/infrastructure/api/tag.api";

export class HttpTagRepository implements TagRepository {
  async getTags(path: string, query?: string): Promise<TagEntity[]> {
    const tags = await tagApi.getTags(path, query);
    return tags.map(
      (tag) =>
        new TagEntity({
          id: tag.id,
          name: tag.name,
        }),
    );
  }
}
