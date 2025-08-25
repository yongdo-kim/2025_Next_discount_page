"use client";

import MainTitle from "@/components/MainTitle";
import DividerLine from "@/components/ui/DividerLine";
import SparklingStarIcon from "@/components/ui/SparklingStarIcon";
import PostCardSmall from "@/features/posts/presentation/components/PostCardSmall";
import { useLikedPosts } from "@/features/users/presentation/hooks/useLikedPosts";

export default function MyDiscountClient() {
  const { data: posts, isLoading } = useLikedPosts(8);

  if (!posts || posts.length === 0) return null;

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="mt-8">
      <MainTitle title="내가 좋아한 포스트" icon={<SparklingStarIcon />} />
      <div className="h-4"></div>
      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        {posts.map((post) => (
          <PostCardSmall key={post.id} post={post} />
        ))}
      </div>
      <DividerLine className="mt-8 mb-8" />
    </section>
  );
}
