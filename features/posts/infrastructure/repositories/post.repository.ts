import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { PostRepository } from "@/features/posts/domain/repositories/post.repository";

import { toPostPreviewEntity } from "@/features/posts/infrastructure/dto/responses/post-preview.res.dto";
import { toPostEntity } from "@/features/posts/infrastructure/dto/responses/post.res.dto";
import { PostPreviewsReqDto } from "@/features/posts/infrastructure/dto/requests/post-preview.req.dto";
import { postApi } from "@/features/posts/infrastructure/api/post.api";

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
}
