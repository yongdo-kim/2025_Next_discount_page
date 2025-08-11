"use client";

import MainTitle from "@/components/MainTitle";
import PostListItem from "@/features/posts/presentation/components/PostListItem";
import { useInfinitePostPreviews } from "@/features/posts/presentation/hooks/use-posts";
import { useCallback, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useMediaQuery } from "react-responsive";

type PostListAreaProps = {
  categoryId: number | null;
  categoryName?: string;
};

const ITEM_HEIGHT = 200; // PostListItem의 고정 높이 (px)

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

  const allPosts = useMemo(() => data?.pages.flatMap((page) => page) || [], [data?.pages]);
  const displayName = categoryName || (allPosts[0]?.category.name ?? "");
  
  // 모바일/데스크톱에 따른 컨테이너 높이
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const containerHeight = isMobile ? (typeof window !== 'undefined' ? window.innerHeight - 200 : 500) : 600;
  
  // 가상화를 위한 설정
  const itemCount = hasNextPage ? allPosts.length + 1 : allPosts.length;
  
  const isItemLoaded = useCallback((index: number) => {
    return !!allPosts[index];
  }, [allPosts]);

  const loadMoreItems = useCallback(async () => {
    if (!isFetchingNextPage && hasNextPage) {
      await fetchNextPage();
    }
    return Promise.resolve();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 각 아이템을 렌더링하는 컴포넌트
  const Item = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const post = allPosts[index];
    
    if (!post) {
      // 로딩 중인 아이템
      return (
        <div style={style}>
          <div className="mx-6 my-2">
            <div className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      );
    }

    return (
      <div style={style}>
        <div className="mx-6 my-2">
          <PostListItem post={post} />
        </div>
      </div>
    );
  }, [allPosts]);

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
      <div className="mt-4">
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              ref={ref}
              width="100%"
              height={containerHeight}
              itemCount={itemCount}
              itemSize={ITEM_HEIGHT}
              onItemsRendered={onItemsRendered}
              className="custom-scrollbar"
              style={{ outline: 'none' }}
            >
              {Item}
            </List>
          )}
        </InfiniteLoader>
        
        {!hasNextPage && allPosts.length > 0 && (
          <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
            모든 포스트를 불러왔습니다.
          </div>
        )}
      </div>
    </>
  );
}
