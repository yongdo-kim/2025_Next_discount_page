"use client";

import PostListArea from "@/features/posts/presentation/components/PostListArea";

type PostsByCategoryClientProps = {
  categoryId: string;
};

export default function PostsByCategoryClient({
  categoryId,
}: PostsByCategoryClientProps) {
  const categoryIdNumber = parseInt(categoryId);
  return <PostListArea categoryId={categoryIdNumber} />;
}
