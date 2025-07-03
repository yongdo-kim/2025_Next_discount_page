"use client";

import MainTitle from "@/components/main-title";
import { usePostPreviews } from "../hooks/use-posts";
import PostCardLarge from "./post-card-large";

export default function PostPreviewCategoryArea({
  categoryId,
  title,
  limit = 5,
}: {
  categoryId: number;
  title: string;
  limit?: number;
}) {
  const { data: posts } = usePostPreviews({
    req: {
      categoryId,
      limit,
    },
  });

  return (
    <>
      <div className="flex justify-between px-4 pb-4">
        <MainTitle title={title} coloredTitle="" showIcon={true} />
      </div>
      <ul className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCardLarge post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}
