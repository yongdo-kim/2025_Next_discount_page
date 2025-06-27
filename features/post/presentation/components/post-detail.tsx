/* eslint-disable @next/next/no-img-element */
"use client";
import { Badge } from "@/components/ui/badge";
import { TagEntity } from "@/features/tag/domain/entities/post.entity";
import { UserEntity } from "@/features/user/domain/entities/user.entity";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import { PostEntity } from "../../domain/entities/post.entity";
import { usePostDetail } from "../hooks/use-posts";
import parse from 'html-react-parser'


export const PostDetail = ({
  postId,
  initialPost,
}: {
  postId: number;
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

  function TagList({ tags }: { tags: TagEntity[] }) {
    if (!tags?.length) return null;
    return (
      <div className="mt-12 flex flex-wrap gap-2">
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
    user: UserEntity;
    createdAt: string;
  }) {
    return (
      <div className="mb-6 flex items-center gap-3">
        <img
          src={user.picture}
          alt={user.nickname}
          width={30}
          height={30}
          className="h-8 w-8 rounded-full object-cover"
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
    <article className="mx-auto max-w-screen-xl px-4 py-6 md:px-32">
      {/* 태그 */}
      <TagList tags={post.tags} />

      {/* 제목 */}
      <h1 className="mb-2 pt-2 text-3xl font-bold">{post.title}</h1>

      {/* 작성자, 작성일 */}
      <AuthorInfo user={post.author} createdAt={post.createdAt} />

      {/* 대표 이미지 */}
      <img
        src={post.imageUrls[0]}
        alt={post.title}
        width={600}
        height={400}
        className="w-full rounded-xl object-cover"
        style={{ maxWidth: "100%", maxHeight: "350px" }}
      />

      {/* 본문 */}
      <div className="prose prose-lg max-w-none text-lg whitespace-pre-line text-neutral-900 dark:text-neutral-100">
        <PostContent html={post.content} />
      </div>
    </article>
  );
};

export default function PostContent({ html }: { html: string }) {
  return <div className="prose max-w-none">{parse(html)}</div>
}