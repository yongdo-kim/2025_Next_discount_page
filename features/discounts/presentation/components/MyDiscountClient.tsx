"use client";

import PostCardLarge from "@/features/posts/presentation/components/PostCardLarge";
import { useLikedPosts } from "@/features/users/presentation/hooks/useLikedPosts";

export default function MyDiscountClient() {
  const { data: discounts } = useLikedPosts();

  if (!discounts || discounts.length === 0) return null;

  return <PostCardLarge post={discounts[0]} />;
}
