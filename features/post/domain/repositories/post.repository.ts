import { PostEntity } from "../entities/post.entity";

export interface PostRepository {
  getPostList(path: string, query?: string): Promise<PostEntity[]>;
  getPostDetail(id: string): Promise<PostEntity>;
}
