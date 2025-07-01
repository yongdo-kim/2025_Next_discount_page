"use client";

import { Button } from "@/components/ui/button";
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
    <section className="pt-8">
      <div className="flex items-center justify-items-center space-x-4 pb-4">
        <div className="pl-1 text-2xl font-bold">{title}</div>
        <Button
          variant="outline"
          onClick={() => {}}
          className="m-0 cursor-pointer text-lg hover:text-emerald-400"
        >
          전체보기
        </Button>
      </div>
      <ul className="scrollbar-hide grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCardLarge post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
