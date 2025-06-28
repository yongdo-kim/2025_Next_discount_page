import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";
import { PostCategory } from "../../domain/types";
import { postApi } from "../api/\bpost.api";
import { toPostPreviewEntity } from "../dto/res/post-preview.res.dto";
import { toPostEntity } from "../dto/res/post.res.dto";

export class HttpPostRepository implements PostRepository {
  async getPostPreviews({
    category,
  }: {
    category?: PostCategory;
  }): Promise<PostPreviewEntity[]> {
    const posts = await postApi.getPostPreviews({ category });
    return posts.map((post) => toPostPreviewEntity(post));
  }
  async getPostDetail(id: number): Promise<PostEntity> {
    const post = await postApi.getPostDetail(id);
    return toPostEntity(post);
  }
}
