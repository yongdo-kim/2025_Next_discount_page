"use client";

import MainTitle from "@/components/MainTitle";
import PostListItem from "@/features/posts/presentation/components/PostListItem";
import { useInfinitePostPreviews } from "@/features/posts/presentation/hooks/use-posts";
import { useMemo } from "react";
import { Virtuoso } from "react-virtuoso";

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

  const allPosts = useMemo(
    () => data?.pages.flatMap((page) => page) || [],
    [data?.pages],
  );
  const displayName = categoryName || (allPosts[0]?.category.name ?? "");

  if (isLoading) {
    return (
      <>
        <MainTitle title={displayName} coloredTitle="" className="p-4" />
        <div className="mt-4">
          {/* 로딩 스켈레톤 UI */}
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="mx-6 my-2">
              <div className="h-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </>
    );
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

  // 빈 데이터 상태 처리
  if (!isLoading && allPosts.length === 0) {
    return (
      <>
        <MainTitle title={displayName} coloredTitle="" className="p-4" />
        <div className="mx-6 mt-4 text-center text-gray-500 dark:text-gray-400">
          표시할 포스트가 없습니다.
        </div>
      </>
    );
  }

  return (
    <>
      <MainTitle title={displayName} coloredTitle="" className="p-4" />
      <div className="mt-4">
        <Virtuoso
          data={allPosts}
          useWindowScroll
          endReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          itemContent={(_, post) => (
            <div className="mx-6 my-2">
              <PostListItem post={post} />
            </div>
          )}
          components={{
            Footer: () => {
              if (isFetchingNextPage) {
                return (
                  <div className="mx-6 my-2">
                    <div className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
                  </div>
                );
              }

              return null;
            },
          }}
        />
      </div>
    </>
  );
}
