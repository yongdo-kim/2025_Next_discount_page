import { GetPostPreviewsReqDto } from "@/features/user/infrastructure/dto/requests/post-preview.req.dto";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";
import { postApi } from "../api/\bpost.api";
import { toPostPreviewEntity } from "../dto/res/post-preview.res.dto";
import { toPostEntity } from "../dto/res/post.res.dto";

export class HttpPostRepository implements PostRepository {
  async getPostPreviews({
    req,
  }: {
    req: GetPostPreviewsReqDto;
  }): Promise<PostPreviewEntity[]> {
    const posts = await postApi.getPostPreviews({ req });
    return posts.map((post) => toPostPreviewEntity(post));
  }
  async getPostDetail(id: number): Promise<PostEntity> {
    const post = await postApi.getPostDetail(id);
    return toPostEntity(post);
  }
}
