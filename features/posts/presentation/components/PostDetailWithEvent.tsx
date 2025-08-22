"use client";
import DividerLine from "@/components/ui/DividerLine";
import { EventTypeTag } from "@/components/ui/EventTypeTag";
import { TicketIcon } from "@/components/ui/TicketIcon";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { PostDetailFooter } from "@/features/posts/presentation/components/PostDetailFooter";
import { PostDetailHeader } from "@/features/posts/presentation/components/PostDetailHeader";
import { sendGAEvent } from "@/lib/ga";
import { formatToMMDD } from "@/lib/utils";
import { useEffect } from "react";

export const PostDetailWithEvent = ({ post }: { post: PostEntity }) => {
  // 상세 페이지 진입 시 GA 이벤트 전송
  useEffect(() => {
    sendGAEvent("post_detail_view_init", {
      post_id: post.id,
      post_title: post?.title,
      author_id: post?.author?.id,
      author_nickname: post?.author?.nickname,
    });
  }, [post]);

  return (
    <article
      className="container mx-auto px-16 py-6"
      data-testid="post-detail-article"
    >
      {/* 태그 */}
      <PostDetailHeader post={post} />

      {/* 제목 */}
      <h1
        className="text-md mb-2 flex items-center gap-2 pt-2 font-bold md:text-2xl lg:text-3xl"
        data-testid="post-detail-title"
      >
        <div className="flex items-center">
          {EventTypeTag({ eventType: post.event?.entryMethod ?? "" })}
        </div>
        <div>{post.event?.organizer + " 이벤트"}</div>
        <div>{formatToMMDD(post.event?.period ?? "") + "까지"}</div>
      </h1>

      <DividerLine className="mt-4" />

      {/* 이벤트 정보 */}
      {post.event && (
        <section className="mt-8" data-testid="post-detail-event-section">
          <div className="mb-8 flex items-center">
            <TicketIcon />
            <h2 className="text-md pl-2 font-bold md:text-lg lg:text-2xl">
              이벤트 정보
            </h2>
          </div>
          {post.event && post.source.originSourceUrl && (
            <div className="mb-4 md:w-[300px]">
              <a
                href={post.source.originSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
              >
                <TicketIcon className="h-5 w-5" />
                <div className="font-bold text-white">이벤트 참여하기</div>
              </a>
            </div>
          )}
          <div className="space-y-4 rounded-lg bg-gradient-to-r from-emerald-50 to-blue-50 p-6 dark:from-emerald-900/20 dark:to-blue-900/20">
            {post.event.organizer && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  주최:
                </span>
                <span className="text-neutral-800 dark:text-neutral-200">
                  {post.event.organizer}
                </span>
              </div>
            )}

            {post.event.entryMethod && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  참여방법:
                </span>
                <span className="text-neutral-800 dark:text-neutral-200">
                  {post.event.entryMethod}
                </span>
              </div>
            )}
            {post.event.winners && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  당첨인원:
                </span>
                <span className="text-neutral-800 dark:text-neutral-200">
                  {post.event.winners}
                </span>
              </div>
            )}
            {post.event.prize && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  경품:
                </span>
                <span className="text-neutral-800 dark:text-neutral-200">
                  {post.event.prize}
                </span>
              </div>
            )}
            {post.event.period && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  기간:
                </span>
                <span className="text-neutral-800 dark:text-neutral-200">
                  {formatToMMDD(post.event.period) + "까지"}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      <DividerLine className="mt-6" />
      <PostDetailFooter post={post} />
    </article>
  );
};
