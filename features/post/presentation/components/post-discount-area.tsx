"use client";

import { PostCategory } from "../../domain/types";
import { usePostPreviews } from "../hooks/use-posts";
import PostCardLarge from "./post-card-large";
import PostCardMiddle from "./post-card-middle";
import PostCardSmall from "./post-card-small";

type PostDiscountAreaProps = {
  title: string;
  category?: PostCategory;
  itemSize: PostCardSize;
};

type PostCardSize = "small" | "middle" | "large";

export default function PostDiscountArea({
  title,
  itemSize,
}: PostDiscountAreaProps) {
  const { data: posts } = usePostPreviews({
    req: { category: "new", limit: 5 },
  });

  const slicedPosts = posts?.slice(0, 5);

  let children;
  if (itemSize === "small") {
    children = (
      <div className="flex space-x-4 whitespace-nowrap">
        {slicedPosts?.map((post) => (
          <li key={post.id}>
            <PostCardSmall post={post} />
          </li>
        ))}
      </div>
    );
  } else if (itemSize === "middle") {
    children = (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-3">
        {slicedPosts?.map((post) => (
          <li key={post.id}>
            <PostCardMiddle post={post} />
          </li>
        ))}
      </div>
    );
  } else if (itemSize === "large") {
    children = (
      <div className="grid grid-cols-1 flex-nowrap gap-2 md:grid-cols-3 lg:grid-cols-3">
        {slicedPosts?.map((post) => (
          <li key={post.id}>
            <PostCardLarge post={post} />
          </li>
        ))}
      </div>
    );
  }

  return (
    <section className="px-8 pt-4 pb-2">
      <div className="flex items-center justify-between justify-items-center pb-2">
        <div className="pb-2 text-lg font-bold">{title}</div>
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
