import { TagEntity } from "../entities/tag.entity";

export interface TagRepository {
  getTags(path: string, query?: string): Promise<TagEntity[]>;
}
