"use client";

import { PostPreviewItem } from "@/features/post/presentation/components/post-preview-item";
import { usePosts } from "@/features/post/presentation/hooks/use-posts";

export function PostList() {
  const { data: posts } = usePosts();
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
      {posts?.map((post) => (
        <li key={post.id}>
          <PostPreviewItem post={post} />
        </li>
      ))}
    </ul>
  );
}
