"use client";

import MainTitle from "@/components/MainTitle";
import DividerLine from "@/components/ui/DividerLine";
import PostCardLarge from "@/features/posts/presentation/components/PostCardLarge";
import { usePostPreviews } from "@/features/posts/presentation/hooks/use-posts";
import { ErrorState } from "@/components/error/ErrorState";
import { isClientError } from "@/lib/error-handler";

export default function PostPreviewCategoryArea({
  categoryId,
  title,
}: {
  categoryId: number;
  title: string;
}) {
  const {
    data: posts,
    error,
    isError,
    refetch,
  } = usePostPreviews({
    req: {
      categoryId,
      limit: 9,
    },
  });

  // 클라이언트 에러는 로컬에서 처리
  if (isError && isClientError(error)) {
    return (
      <>
        <div
          className="flex justify-between px-4 pb-4"
          data-testid="post-preview-category-header"
        >
          <MainTitle title={title} />
        </div>
        <ErrorState
          error={error}
          onRetry={refetch}
          size="sm"
          data-testid="post-preview-category-error"
        />
        <DividerLine className="mt-8 mb-8" />
      </>
    );
  }

  if (!posts || posts.length === 0) return null;

  return (
    <>
      <div
        className="flex justify-between px-4 pb-4"
        data-testid="post-preview-category-header"
      >
        <MainTitle title={title} />
      </div>
      <ul
        className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
        data-testid="post-preview-category-grid"
      >
        {posts.map((post) => (
          <li key={post.id} data-testid="post-preview-category-item">
            <PostCardLarge post={post} />
          </li>
        ))}
      </ul>
      <DividerLine className="mt-8 mb-8" />
    </>
  );
}
