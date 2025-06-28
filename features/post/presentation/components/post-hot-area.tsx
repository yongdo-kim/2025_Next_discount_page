"use client";

import { Button } from "@/components/ui/button";
import { usePostPreviews } from "../hooks/use-posts";
import PostCardSmall from "./post-card-small";

export default function PostHotArea() {
  const { data: posts } = usePostPreviews({
    req: { category: "hot", limit: 5 },
  });

  const children = (
    <div className="flex space-x-4 whitespace-nowrap">
      {posts?.map((post) => (
        <li key={post.id}>
          <PostCardSmall post={post} />
        </li>
      ))}
    </div>
  );

  return (
    <section className="pt-4 pb-2 pl-8">
      <div className="flex items-center justify-between justify-items-center pb-2">
        <div className="flex pb-2 text-lg font-bold lg:text-3xl">
          <div>오늘의 </div>
          <div className="px-2 text-red-400"> 따끈한 할인</div>
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
