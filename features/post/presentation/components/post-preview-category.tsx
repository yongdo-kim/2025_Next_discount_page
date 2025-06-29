"use client";

import { Badge } from "@/components/ui/badge";
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
    <section className="">
      <div className="flex items-center justify-between justify-items-center">
        <Badge variant="outline" className="text-2xl text-green-400">
          {title}
        </Badge>
        <Button
          variant="outline"
          onClick={() => {}}
          className="m-0 cursor-pointer text-lg"
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
