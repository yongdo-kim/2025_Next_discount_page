"use client";

import MainTitle from "@/components/main-title";
import PostCardMiddle from "@/features/post/presentation/components/post-card-middle";
import { usePostPreviews } from "@/features/post/presentation/hooks/use-posts";
import { useWindowWidth } from "@/lib/hooks/use-window-width";

export default function CategoryRandomArea() {
  const { data: posts } = usePostPreviews({
    req: {
      limit: 5,
    },
  });

  const width = useWindowWidth();
  // sm, md는 4개, lg 이상은 5개, 모바일(640 미만)도 4개
  let count = 4;
  if (width >= 1024) count = 5;

  const PostCardMiddleList = () => (
    <ul className="grid grid-cols-1 gap-4 gap-y-4 px-4 pb-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {posts?.slice(0, count).map((post) => {
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
    <section className="pt-4 pb-2 md:pt-8">
      <div className="flex justify-between px-4 pb-4">
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
