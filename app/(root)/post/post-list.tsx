"use client";

import { usePosts } from "@/features/post/presentation/hooks/use-posts";
import { PostEntity } from "@/features/post/domain/entities/post.entity";

export function PostList({ initialData }: { initialData?: PostEntity[] }) {
  const { data: posts } = usePosts(initialData);
  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
