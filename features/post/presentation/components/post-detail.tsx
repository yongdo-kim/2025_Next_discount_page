"use client";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import Image from "next/image";
import { PostEntity } from "../../domain/entities/post.entity";
import { usePostDetail } from "../hooks/use-posts";
export const PostDetail = ({
  postId,
  initialPost,
}: {
  postId: string;
  initialPost?: PostEntity;
}) => {
  const {
    data: post,
    error,
    isLoading,
  } = usePostDetail({ id: postId, initialPost });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!post) return <div>no data</div>;

  function TagList({ tags }: { tags: { id: string; name: string }[] }) {
    if (!tags?.length) return null;
    return (
      <div className="flex flex-wrap gap-2 mt-12">
        {tags.map((tag) => (
          <Badge variant="outline" key={tag.id}>
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
    user: { nickname: string; profileImageUrl: string };
    createdAt: Date;
  }) {
    return (
      <div className="flex items-center gap-3 mb-6">
        <Image
          src={user.profileImageUrl}
          alt={user.nickname}
          width={30}
          height={30}
          className="w-8 h-8 rounded-full object-cover "
        />
        <div>
          <div className="font-semibold text-neutral-800 dark:text-neutral-50">
            {user.nickname}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            {format(new Date(createdAt), "yyyy년 M월 d일", { locale: ko })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-screen-xl mx-auto md:px-32 px-4 py-6 ">
      {/* 태그 */}
      <TagList tags={post.tags} />

      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-2 pt-2">{post.title}</h1>

      {/* 작성자, 작성일 */}
      <AuthorInfo user={post.user} createdAt={post.createdAt} />

      {/* 대표 이미지 */}
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={600}
        height={400}
        className="rounded-xl object-cover w-full"
        style={{ maxWidth: "100%", maxHeight: "350px" }}
      />

      {/* 본문 */}
      <div className="prose prose-lg max-w-none text-neutral-900 dark:text-neutral-100 whitespace-pre-line text-lg">
        {post.content}
      </div>
    </article>
  );
};
