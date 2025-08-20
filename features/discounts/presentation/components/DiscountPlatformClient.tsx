"use client";

import { ErrorState } from "@/components/error/ErrorState";
import MainTitle from "@/components/MainTitle";
import { useFetchDiscountPlatforms } from "@/features/discounts/presentation/hooks/use-fetch-discount-platforms";
import { isClientError } from "@/lib/error-handler";
import { ShoppingBagIcon } from "lucide-react";

export default function DiscountPlatformClient() {
  const {
    data: platforms,
    error,
    isError,
    refetch,
  } = useFetchDiscountPlatforms();
  const hasData = platforms && platforms.totalPostsCount > 0;

  return (
    <section className="pt-4 pb-2 md:pb-8">
      <div
        className={`flex justify-between px-4 ${hasData ? "pb-3" : "pb-4 md:pb-8"}`}
      >
        <MainTitle
          title="할인 플랫폼 목록을 가져왔어요!"
          icon={<ShoppingBagIcon className="h-5 w-5" />}
        />
      </div>

      {isError && isClientError(error) && (
        <ErrorState error={error} onRetry={refetch} size="sm" />
      )}

      {hasData && platforms && (
        <div className="space-y-6 px-4">
          {/* Kakao */}
          {platforms.kakao.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">카카오</h3>
              <div className="grid grid-cols-1 gap-2">
                {platforms.kakao.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-card rounded-lg border p-3">
                    <h4 className="line-clamp-2 text-sm font-medium">
                      {post.title}
                    </h4>
                    <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
                      <span>조회수 {post.views}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coupang */}
          {platforms.coupang.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">쿠팡</h3>
              <div className="grid grid-cols-1 gap-2">
                {platforms.coupang.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-card rounded-lg border p-3">
                    <h4 className="line-clamp-2 text-sm font-medium">
                      {post.title}
                    </h4>
                    <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
                      <span>조회수 {post.views}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Naver */}
          {platforms.naver.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">네이버</h3>
              <div className="grid grid-cols-1 gap-2">
                {platforms.naver.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-card rounded-lg border p-3">
                    <h4 className="line-clamp-2 text-sm font-medium">
                      {post.title}
                    </h4>
                    <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
                      <span>조회수 {post.views}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ohouse */}
          {platforms.ohouse.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">오늘의집</h3>
              <div className="grid grid-cols-1 gap-2">
                {platforms.ohouse.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-card rounded-lg border p-3">
                    <h4 className="line-clamp-2 text-sm font-medium">
                      {post.title}
                    </h4>
                    <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
                      <span>조회수 {post.views}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gmarket */}
          {platforms.gmarket.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">G마켓</h3>
              <div className="grid grid-cols-1 gap-2">
                {platforms.gmarket.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-card rounded-lg border p-3">
                    <h4 className="line-clamp-2 text-sm font-medium">
                      {post.title}
                    </h4>
                    <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
                      <span>조회수 {post.views}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
