"use client";
import DividerLine from "@/components/ui/DividerLine";
import { EventTypeTag } from "@/components/ui/EventTypeTag";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { PostDetailFooter } from "@/features/posts/presentation/components/PostDetailFooter";
import { PostDetailHeader } from "@/features/posts/presentation/components/PostDetailHeader";
import { sendGAEvent } from "@/lib/ga";
import { formatToMMDD } from "@/lib/utils";
import { Ticket } from "lucide-react";
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
      className="container mx-auto px-8 py-6"
      data-testid="post-detail-article"
    >
      {/* 태그 */}
      <PostDetailHeader post={post} />

      {/* 제목 */}
      <h1
        className="mb-2 flex items-center gap-2 pt-2 text-3xl font-bold"
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
            <Ticket />
            <h2 className="pl-2 text-2xl font-bold">이벤트 정보</h2>
          </div>
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
                  {post.event.period}
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
