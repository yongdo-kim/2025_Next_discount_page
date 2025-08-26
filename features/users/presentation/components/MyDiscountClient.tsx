"use client";

import MainTitle from "@/components/MainTitle";
import DividerLine from "@/components/ui/DividerLine";
import SparklingStarIcon from "@/components/ui/SparklingStarIcon";
import PostCardSmall from "@/features/posts/presentation/components/PostCardSmall";
import { useLikedPosts } from "@/features/users/presentation/hooks/useLikedPosts";
import { useMe } from "@/features/users/presentation/hooks/useMe";

export default function MyDiscountClient() {
  const { data: user, isLoading: userLoading } = useMe();
  const { data: postsData, isLoading: postsLoading } = useLikedPosts(8, !!user);

  // 최신 8개만 선택하고 정렬 보장
  const posts = postsData
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 8);

  // 사용자가 로그인되지 않은 경우 렌더링하지 않음
  if (!user && !userLoading) return null;

  if (userLoading || postsLoading)
    return <div data-testid="my-discount-loading">Loading...</div>;

  if (!posts || posts.length === 0) return null;

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
