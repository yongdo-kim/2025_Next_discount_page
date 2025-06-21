import { PostEntity } from "../entities/post.entity";

export interface PostRepository {
  getPostList(): Promise<PostEntity[]>;
}
