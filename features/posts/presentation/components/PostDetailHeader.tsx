"use client";

import { Badge } from "@/components/shadcn/badge";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { usePostLike } from "@/features/posts/presentation/hooks/use-post-like";
import { useMe } from "@/features/users/presentation/hooks/useMe";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import { Heart } from "lucide-react";
import Image from "next/image";

export const PostDetailHeader = ({ post }: { post: PostEntity }) => {
  const { isLiked, isPending, toggleLike } = usePostLike(
    post.id,
    post.isLikedByMe,
  );

  const { data: user } = useMe(false); //데이터만 확인.

  return (
    <div className="flex flex-col justify-between">
      <div className="w-full">
        <TagList tags={post.tags} />
      </div>
      <div className="flex items-center justify-between">
        <AuthorInfo user={post.author} createdAt={post.createdAt} />
        <button
          onClick={user ? toggleLike : undefined}
          disabled={isPending}
          className="flex cursor-pointer items-center gap-1 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          data-testid="post-detail-like-button"
        >
          <Heart
            size={20}
            className={`transition-colors ${
              isLiked
                ? "fill-red-500 text-red-500"
                : "text-gray-500 hover:text-red-500"
            } ${isPending ? "opacity-50" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

function TagList({ tags }: { tags: TagEntity[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-2" data-testid="post-detail-tags">
      {tags.map((tag) => (
        <Badge
          variant="outline"
          key={tag.id}
          className="md:text-md text-sm lg:text-lg"
          data-testid="post-detail-tag"
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}

function AuthorInfo({
  user,
  createdAt,
}: {
  user: UserEntity;
  createdAt: string;
}) {
  return (
    <div
      className="mt-4 mb-4 flex items-center gap-3 pl-2"
      data-testid="post-detail-author-info"
    >
      <Image
        src="/discount-character.webp"
        alt={user.nickname}
        width={20}
        height={20}
        sizes="20px"
        data-testid="post-detail-author-avatar"
      />

      <div
        className="flex items-center"
        data-testid="post-detail-author-details"
      >
        <div
          className="font-semibold text-neutral-800 dark:text-neutral-50"
          data-testid="post-detail-author-nickname"
        >
          {user.nickname}
        </div>
        <div
          className="pl-2 text-neutral-800 dark:text-gray-200"
          data-testid="post-detail-created-at"
        >
          {format(new Date(createdAt), "yyyy년 M월 d일", { locale: ko })}
        </div>
      </div>
    </div>
  );
}
