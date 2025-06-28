"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePostPreviews } from "../hooks/use-posts";
import PostCardLarge from "./post-card-large";

export default function PostPreviewGameArea() {
  const { data: posts } = usePostPreviews({
    req: { category: "game", limit: 6 },
  });

  return (
    <section className="pt-4 pb-2 pl-8">
      <div className="flex items-center justify-between justify-items-center pb-2">
        <Badge variant="outline" className="text-2xl text-green-400">
          게임 정보
        </Badge>
        <Button
          variant="outline"
          onClick={() => {}}
          className="m-0 cursor-pointer text-lg"
        >
          전체보기
        </Button>
      </div>
      <ul className="scrollbar-hide grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCardLarge post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
