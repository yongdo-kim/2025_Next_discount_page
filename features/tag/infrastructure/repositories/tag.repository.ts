import { TagEntity } from "../../domain/entities/post.entity";
import { TagRepository } from "../../domain/repositories/tag.repository";
import { tagApi } from "../api/tag.api";

export class HttpTagRepository implements TagRepository {
  async getTags(path: string, query?: string): Promise<TagEntity[]> {
    const tags = await tagApi.getTags(path, query);
    return tags.map(
      (tag) =>
        new TagEntity({
          id: tag.id,
          name: tag.name,
        })
    );
  }
}
