"use client";
import { usePostDetail } from "../hooks/use-posts";

export const PostDetail = ({ postId }: { postId: string }) => {
  const { data: post } = usePostDetail(postId);
  return <div>{post?.content}</div>;
};
