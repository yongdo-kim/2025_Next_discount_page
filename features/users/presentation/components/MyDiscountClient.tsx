"use client";

import MainTitle from "@/components/MainTitle";
import DividerLine from "@/components/ui/DividerLine";
import SparklingStarIcon from "@/components/ui/SparklingStarIcon";
import PostCardSmall from "@/features/posts/presentation/components/PostCardSmall";
import { useLikedPosts } from "@/features/users/presentation/hooks/useLikedPosts";

export default function MyDiscountClient() {
  const { data: postsData, isLoading: postsLoading } = useLikedPosts(true);

  if (postsLoading) return <div data-testid="my-discount-loading"></div>;
  if (!postsData || postsData.length === 0) return null;

  const posts = postsData
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 8);

  return (
    <section className="mt-8" data-testid="my-discount-section">
      <MainTitle title="내가 좋아하는 포스트" icon={<SparklingStarIcon />} />
      <div className="h-4"></div>
      <div
        className="grid grid-cols-4 gap-4"
        data-testid="my-discount-grid-container"
      >
        {posts.map((post) => (
          <PostCardSmall
            key={post.id}
            post={post}
            data-testid="my-discount-post-item"
          />
        ))}
      </div>
      <DividerLine className="mt-8 mb-8" />
    </section>
  );
}
