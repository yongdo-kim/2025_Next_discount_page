"use client";

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
    <section className="px-8 pt-4 pb-2">
      <div className="flex items-center justify-between justify-items-center pb-2">
        <div className="pb-2 text-lg font-bold lg:text-2xl">
          가장 인기있는 할인
        </div>
        <button
          type="button"
          className="m-0 cursor-pointer border-none bg-transparent p-0 text-sm text-neutral-500"
          onClick={() => {
            //TODO : 전체보기 이동하기
          }}
        >
          전체보기
        </button>
      </div>
      <ul className="scrollbar-hide">{children}</ul>
    </section>
  );
}
