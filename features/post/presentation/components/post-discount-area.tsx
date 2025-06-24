"use client";

import { PostCategory } from "../../domain/types";
import { usePosts } from "../hooks/use-posts";
import { PostCardSmall } from "./post-card-small";

export default function PostDiscountArea({
  title,
  category,
}: {
  title: string;
  category?: PostCategory;
}) {
  const { data: posts } = usePosts(category);

  const slicedPosts = posts?.slice(0, 3);

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
      <ul className="scrollbar-hide flex flex-nowrap gap-2">
        {slicedPosts?.map((post) => (
          <li key={post.id}>
            <PostCardSmall post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
