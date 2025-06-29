"use client";

import { Button } from "@/components/ui/button";
import PostCardMiddle from "@/features/post/presentation/components/post-card-middle";
import { usePostPreviews } from "@/features/post/presentation/hooks/use-posts";

export default function CategoryRandomArea() {
  const { data: categories } = usePostPreviews({
    req: {
      limit: 5,
    },
  });

  const children = (
    <div className="flex space-x-4 whitespace-nowrap">
      {categories?.map((post) => {
        if (!post) return null;
        return (
          <li key={post.id}>
            <PostCardMiddle post={post} />
          </li>
        );
      })}
    </div>
  );

  return (
    <section className="pt-4 pb-2 pl-8">
      <div className="flex items-center justify-between justify-items-center pb-2">
        <div className="flex pb-2 text-lg font-bold lg:text-3xl">
          <div>랜덤 </div>
          <div className="px-2 text-red-400"> 추천</div>
        </div>
        <Button
          variant="outline"
          onClick={() => {}}
          className="m-0 cursor-pointer text-lg"
        >
          전체보기
        </Button>
      </div>
      <ul className="scrollbar-hide">{children}</ul>
    </section>
  );
}
