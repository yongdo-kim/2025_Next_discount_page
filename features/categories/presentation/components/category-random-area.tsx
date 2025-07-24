"use client";

import MainTitle from "@/components/MainTitle";
import PostCardMiddle from "@/features/posts/presentation/components/post-card-middle";
import { useCategoryPostPreviews } from "@/features/posts/presentation/hooks/use-posts";

export default function CategoryRandomArea() {
  const { data: posts } = useCategoryPostPreviews();

  const PostCardMiddleList = () => (
    <ul className="grid grid-cols-1 gap-4 gap-y-4 px-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posts?.slice(0, 4).map((post) => {
        if (!post) return null;
        return (
          <li key={post.id}>
            <PostCardMiddle post={post} />
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className="pt-4 pb-2 md:pt-8 md:pb-8">
      <div className="flex justify-between px-4 pt-4 pb-4">
        <MainTitle
          title="테마별"
          coloredTitle=" 특가 추천"
          color="text-blue-400"
        />
      </div>
      <PostCardMiddleList />
    </section>
  );
}
