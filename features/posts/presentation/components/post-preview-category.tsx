"use client";

import MainTitle from "@/components/main-title";
import { Divider } from "@/components/ui/divider";
import { usePostPreviews } from "@/features/posts/presentation/hooks/use-posts";
import PostCardLarge from "@/features/posts/presentation/components/post-card-large";

export default function PostPreviewCategoryArea({
  categoryId,
  title,
}: {
  categoryId: number;
  title: string;
}) {
  const { data: posts } = usePostPreviews({
    req: {
      categoryId,
      limit: 9,
    },
  });

  if (!posts || posts.length === 0) return null;

  return (
    <>
      <div className="flex justify-between px-4 pb-4">
        <MainTitle title={title} coloredTitle="" showIcon={true} />
      </div>
      <ul className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCardLarge post={post} />
          </li>
        ))}
      </ul>
      <Divider className="mt-8 mb-8" />
    </>
  );
}
