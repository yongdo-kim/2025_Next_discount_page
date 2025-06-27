import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";
import { PostCategory } from "../../domain/types";
import { postApi } from "../api/\bpost.api";
import { toPostEntity } from "../dto/post.dto";

export class HttpPostRepository implements PostRepository {
  async getPostPreviews({
    category,
  }: {
    category?: PostCategory;
  }): Promise<PostEntity[]> {
    const posts = await postApi.getPostPreviews({ category });
    return posts.map((post) => toPostEntity(post));
  }
  async getPostDetail(id: number): Promise<PostEntity> {
    const post = await postApi.getPostDetail(id);
    return toPostEntity(post);
  }
}
