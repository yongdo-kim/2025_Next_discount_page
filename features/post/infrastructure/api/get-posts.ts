import { apiClient } from "@/lib/api/client";

import { PostEntity } from "../../domain/entities/post.entity";
import { postResponseSchema } from "../dto/post.dto";

export async function getPostList(): Promise<PostEntity[]> {
  const posts = await apiClient.get("/posts");
  //pasre가 간단한 toDomain으로 mapper 역할을 담당.
  const parsed = postResponseSchema.array().parse(posts);

  return parsed.map(
    (post) =>
      new PostEntity({
        id: post.id,
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
      })
  );
}
