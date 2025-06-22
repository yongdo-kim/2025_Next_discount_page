"use client";

import { PostPreviewItem } from "@/features/post/presentation/components/post-preview-item";
import { usePosts } from "@/features/post/presentation/hooks/use-posts";

export function PostList() {
  const { data: posts } = usePosts();
  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>
          <PostPreviewItem post={post} />
        </li>
      ))}
    </ul>
  );
}
