import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepository } from "../../domain/repositories/post.repository";
import { postApi } from "../api/\bpost.api";

export class HttpPostRepository implements PostRepository {
  async getPostList(path: string, query?: string): Promise<PostEntity[]> {
    const posts = await postApi.getPosts(path, query);
    return posts.map(
      (post) =>
        new PostEntity({
          id: post.id,
          title: post.title,
          content: post.content,
          imageUrl: post.imageUrl,
          user: post.user,
          tags: post.tags,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
        })
    );
  }
  async getPostDetail(id: string): Promise<PostEntity> {
    const post = await postApi.getPostDetail(id);
    return new PostEntity({
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      user: post.user,
      tags: post.tags,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    });
  }
}
