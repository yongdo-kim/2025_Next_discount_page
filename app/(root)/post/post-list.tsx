"use client";

import PostCardLarge from "@/features/post/presentation/components/post-card-large";
import { usePosts } from "@/features/post/presentation/hooks/use-posts";

export default function PostList() {
  const { data: posts } = usePosts();
  return (
    <section className="px-8 pt-[32px]">
      <div className="pb-2 text-lg font-bold">진행중인 할인 리스트</div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCardLarge post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
