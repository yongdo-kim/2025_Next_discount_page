import { TagEntity } from "../entities/post.entity";

export interface TagRepository {
  getTags(path: string, query?: string): Promise<TagEntity[]>;
}
