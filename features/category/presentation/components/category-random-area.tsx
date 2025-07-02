"use client";

import MainTitle from "@/components/main-title";
import SeeAllButton from "@/components/see-all-button";
import PostCardMiddle from "@/features/post/presentation/components/post-card-middle";
import { usePostPreviews } from "@/features/post/presentation/hooks/use-posts";

export default function CategoryRandomArea() {
  const { data: categories } = usePostPreviews({
    req: {
      limit: 4,
    },
  });

  const PostCardMiddleList = () => (
    <ul className="grid grid-cols-1 gap-y-4 px-4 md:grid-cols-4 lg:grid-cols-5">
      {categories?.map((post) => {
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
    <section className="pt-4 pb-2">
      <div className="flex justify-between px-4 pb-4">
        <MainTitle
          title="테마별"
          coloredTitle=" 특가 추천"
          color="text-blue-400"
        />
        <SeeAllButton href="/" className="p-2 text-sm" />
      </div>
      <PostCardMiddleList />
    </section>
  );
}
