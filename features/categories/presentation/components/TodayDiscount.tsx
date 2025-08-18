"use client";
import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { PostPreviewOneLine } from "@/features/posts/presentation/components/PostPreviewOneLine";
import { usePostPreviews } from "@/features/posts/presentation/hooks/use-posts";
import { isClientError } from "@/lib/error-handler";
import { Flame } from "lucide-react";

export function TodayDiscountArea() {
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
      <ul className="">
        {categories?.map((post) => {
          if (!post) return null;
          return (
            <li key={post.id}>
              <PostPreviewOneLine post={post} />
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
            title="오늘의 할인"
            icon={
              <>
                <svg width="0" height="0">
                  <defs>
                    <linearGradient
                      id="flame-gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                <Flame
                  className="h-6 w-6"
                  style={{
                    stroke: "url(#flame-gradient)",
                    strokeWidth: 1.5,
                    fill: "url(#flame-gradient)",
                  }}
                />
              </>
            }
          />
        </div>
        <ErrorState error={error} onRetry={refetch} size="sm" />
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="pt-4 pb-2 md:pb-8">
        <div className="flex justify-between px-4 pb-4 md:pb-8">
          <MainTitle
            title="오늘의 할인"
            icon={
              <>
                <svg width="0" height="0">
                  <defs>
                    <linearGradient
                      id="flame-gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                <Flame
                  className="h-6 w-6"
                  style={{
                    stroke: "url(#flame-gradient)",
                    strokeWidth: 1.5,
                    fill: "url(#flame-gradient)",
                  }}
                />
              </>
            }
          />
        </div>
      </section>
    );
  }

  return (
    <section className="pt-4 pb-2 md:pb-8">
      <div className="flex justify-between px-4 pb-4 md:pb-8">
        <MainTitle
          title="오늘의 할인"
          icon={
            <>
              <svg width="0" height="0">
                <defs>
                  <linearGradient
                    id="flame-gradient-2"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>
              <Flame
                className="h-6 w-6"
                style={{
                  stroke: "url(#flame-gradient-2)",
                  strokeWidth: 1.5,
                  fill: "url(#flame-gradient-2)",
                }}
              />
            </>
          }
        />
      </div>
      <PostCardSmallList />
    </section>
  );
}
