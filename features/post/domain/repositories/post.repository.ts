import { PostPreviewEntity } from "../entities/post-preview.entity";
import { PostEntity } from "../entities/post.entity";
import { PostCategory } from "../types";

export interface PostRepository {
  getPostPreviews({ category }: { category?: PostCategory }): Promise<PostPreviewEntity[]>;
  getPostDetail(id: number): Promise<PostEntity>;
}
