"use client";

import MainTitle from "@/components/MainTitle";
import PostListItem from "@/features/posts/presentation/components/PostListItem";
import { useInfinitePostPreviews } from "@/features/posts/presentation/hooks/use-posts";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type PostListAreaProps = {
  categoryId: number | null;
  categoryName?: string;
};

export default function PostListArea({
  categoryId,
  categoryName,
}: PostListAreaProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfinitePostPreviews({
    categoryId,
    limit: 20,
  });

  const { ref, inView } = useInView({
    threshold: 0, //얼마나 눈에 보일 것인가에 대한 판단.
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page) || [];
  const displayName = categoryName || (allPosts[0]?.category.name ?? "");

  if (isLoading) {
    return <MainTitle title={displayName} coloredTitle="" className="p-4" />;
  }

  if (error) {
    return (
      <>
        <MainTitle title={displayName} coloredTitle="" className="p-4" />
        <div className="mx-6 mt-4 text-center text-red-500">
          데이터를 불러오는데 실패했습니다.
        </div>
      </>
    );
  }

  return (
    <>
      <MainTitle title={displayName} coloredTitle="" className="p-4" />
      <div className="mx-6 mt-4 flex flex-col space-y-4">
        {allPosts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}

        {/* 무한스크롤 트리거 */}
        <div ref={ref} className="py-4">
          {isFetchingNextPage && (
            <div className="flex flex-col space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-lg bg-slate-700"
                />
              ))}
            </div>
          )}
          {!hasNextPage && allPosts.length > 0 && <></>}
        </div>
      </div>
    </>
  );
}
