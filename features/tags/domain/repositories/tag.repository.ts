import { TagEntity } from "@/features/tags/domain/entities/tag.entity";


export interface TagRepository {
  getTags(path: string, query?: string): Promise<TagEntity[]>;
}
