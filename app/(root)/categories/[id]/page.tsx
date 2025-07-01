"use client";
import PostListItem from "@/features/post/presentation/components/post-list-item";
import { usePostPreviews } from "@/features/post/presentation/hooks/use-posts";
import React from "react";

export default function CategoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(props.params);
  const numId = Number(id);

  const { data: previews } = usePostPreviews({
    req: {
      categoryId: numId,
    },
  });
  return (
    <div className="flex flex-col space-y-4 m-4">
      {previews?.map((preview) => (
        <PostListItem key={preview.id} post={preview} />
      ))}
    </div>
  );
}
