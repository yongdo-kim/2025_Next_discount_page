"use client";

import { PostCategory } from "../../domain/types";
import { usePosts } from "../hooks/use-posts";
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
  category,
  itemSize,
}: PostDiscountAreaProps) {
  const { data: posts } = usePosts(category);

  const slicedPosts = posts?.slice(0, 5);

  let children;
  if (itemSize === "small") {
    children = slicedPosts?.map((post) => (
      <li key={post.id}>
        <PostCardSmall post={post} />
      </li>
    ));
  } else if (itemSize === "middle") {
    children = slicedPosts?.map((post) => (
      <li key={post.id}>
        <PostCardMiddle post={post} />
      </li>
    ));
  } else if (itemSize === "large") {
    children = slicedPosts?.map((post) => (
      <li key={post.id}>
        <PostCardLarge post={post} />
      </li>
    ));
  }

  return (
    <section className="px-8 pt-4 pb-2">
      <div className="flex items-center justify-between pb-2">
        <div className="text-lg font-bold">{title}</div>
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
      <ul className="scrollbar-hide flex flex-nowrap gap-2">{children}</ul>
    </section>
  );
}
