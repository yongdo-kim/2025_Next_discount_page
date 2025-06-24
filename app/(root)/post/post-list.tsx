"use client";

import { PostCard } from "@/features/post/presentation/components/post-card";
import { usePosts } from "@/features/post/presentation/hooks/use-posts";

export function PostList() {
  const { data: posts } = usePosts();
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 pt-[32px]">
      {posts?.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
