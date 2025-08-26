"use client";
import { PostDetailWithEvent } from "@/features/posts/presentation/components/PostDetailWithEvent";
import { PostDetailWithoutEvent } from "@/features/posts/presentation/components/PostDetailWithoutEvent";
import { sendGAEvent } from "@/lib/ga";
import { useEffect } from "react";
import { usePostDetail } from "@/features/posts/presentation/hooks/use-posts";

export const PostDetail = ({ postId }: { postId: number }) => {
  const { data: post, error, isLoading } = usePostDetail({ id: postId });
  // 상세 페이지 진입 시 GA 이벤트 전송
  useEffect(() => {
    sendGAEvent("post_detail_view_init", {
      post_id: postId,
      post_title: post?.title,
      author_id: post?.author?.id,
      author_nickname: post?.author?.nickname,
    });
  }, [post, postId]);

  if (isLoading) return <div data-testid="post-detail-loading"></div>;
  if (!post || error) throw new Error("게시글을 찾을 수 없습니다.");

  if (post.event != null) {
    return <PostDetailWithEvent post={post} />;
  } else {
    return <PostDetailWithoutEvent post={post} />;
  }
};
