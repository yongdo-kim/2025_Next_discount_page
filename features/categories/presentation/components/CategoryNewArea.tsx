"use client";
import MainTitle from "@/components/MainTitle";
import PostCardSmall from "@/features/posts/presentation/components/PostCardSmall";
import { usePostPreviews } from "@/features/posts/presentation/hooks/use-posts";
import { ErrorState } from "@/components/error/ErrorState";
import { isClientError } from "@/lib/error-handler";

export default function NewCategoryDiscountArea() {
  const {
    data: categories,
    error,
    isError,
    refetch,
  } = usePostPreviews({
    req: {
      limit: 8,
      categoryId: null,
    },
  });

  const PostCardSmallList = () => {
    return (
      <ul className="grid grid-cols-1 gap-4 gap-y-4 px-4 whitespace-nowrap md:grid-cols-3 lg:grid-cols-4">
        {categories?.map((post, index) => {
          if (!post) return null;
          return (
            <li key={post.id}>
              <PostCardSmall post={post} priority={index < 4} />
            </li>
          );
        })}
      </ul>
    );
  };

  // 클라이언트 에러는 로컬에서 처리
  if (isError && isClientError(error)) {
    return (
      <section className="pt-4 pb-2 md:pb-8">
        <div className="flex justify-between px-4 pb-4 md:pb-8">
          <MainTitle
            title="오늘의"
            coloredTitle=" 따끈한 할인"
            color="text-red-400"
          />
        </div>
        <ErrorState error={error} onRetry={refetch} size="sm" />
      </section>
    );
  }

  if (!categories || categories.length === 0) return null;

  return (
    <section className="pt-4 pb-2 md:pb-8">
      <div className="flex justify-between px-4 pb-4 md:pb-8">
        <MainTitle
          title="오늘의"
          coloredTitle=" 따끈한 할인"
          color="text-red-400"
        />
      </div>
      <PostCardSmallList />
    </section>
  );
}
