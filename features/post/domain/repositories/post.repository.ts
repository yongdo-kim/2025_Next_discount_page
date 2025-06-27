import { PostEntity } from "../entities/post.entity";
import { PostCategory } from "../types";

export interface PostRepository {
  getPostPreviews({ category }: { category?: PostCategory }): Promise<PostEntity[]>;
  getPostDetail(id: number): Promise<PostEntity>;
}
