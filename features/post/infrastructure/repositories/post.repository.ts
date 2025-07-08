import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";

import { toPostPreviewEntity } from "../dto/responses/post-preview.res.dto";
import { toPostEntity } from "../dto/responses/post.res.dto";
import { PostPreviewsReqDto } from "../dto/requests/post-preview.req.dto";
import { postApi } from "../api/post.api";

export class HttpPostRepository implements PostRepository {
  async getPostPreviews({
    req,
  }: {
    req: PostPreviewsReqDto;
  }): Promise<PostPreviewEntity[]> {
    const posts = await postApi.getPostPreviews({ req });
    return posts.map((post) => toPostPreviewEntity(post));
  }
  async getPostDetail(id: number): Promise<PostEntity> {
    const post = await postApi.getPostDetail(id);
    return toPostEntity(post);
  }
  async getCategoryPostPreviews(): Promise<PostPreviewEntity[]> {
    const posts = await postApi.getCategoryPostPreviews();
    return posts.map((post) => toPostPreviewEntity(post));
  }
}
