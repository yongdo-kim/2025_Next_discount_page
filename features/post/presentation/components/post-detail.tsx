/* eslint-disable @next/next/no-img-element */
"use client";
import { Badge } from "@/components/ui/badge";
import { TagEntity } from "@/features/tag/domain/entities/tag.entity";
import { UserEntity } from "@/features/user/domain/entities/user.entity";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import parse from "html-react-parser";
import { PostEntity } from "../../domain/entities/post.entity";
import { usePostDetail } from "../hooks/use-posts";

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
          <Badge
            variant="outline"
            key={tag.id}
            className="md:text-md lg:text-lg"
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    );
  }
  // 파일 상단 혹은 별도 파일에 선언
  function SourceLink({
    url,
    labelColor = "text-neutral-500",
    linkColor = "text-blue-400 underline hover:text-blue-500",
  }: {
    url?: string;
    labelColor?: string;
    linkColor?: string;
  }) {
    if (!url) return null;

    const MAX_LENGTH = 40;
    let displayUrl = url;
    if (url.length > MAX_LENGTH) {
      displayUrl = url.slice(0, 30) + "..." + url.slice(-8);
    }

    return (
      <div>
        <span className={labelColor}>자료출처:</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkColor}
          title={url}
        >
          {displayUrl}
        </a>
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
      <div className="mt-4 mb-4 flex items-center gap-3">
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
      <div className="mt-8 mb-8">
        <img
          src={post.imageUrl}
          alt={post.title}
          width={600}
          height={400}
          className="mb-2 w-full rounded-xl object-cover"
          style={{ maxWidth: "100%", maxHeight: "350px" }}
        />
        {/* 대표이미지-링크 */}
        <SourceLink
          url={post.source?.originSourceUrl}
          labelColor="text-neutral-500"
          linkColor="text-neutral-300 underline hover:text-neutral-400"
        />
      </div>

      {/* 본문 */}
      <div className="w-full pb-8 text-lg whitespace-pre-line text-neutral-900 dark:text-neutral-100">
        <PostContent html={post.content} />
      </div>

      {/* 자료출처 */}
      <div className="border-t pt-4">
        <SourceLink url={post.source?.scrapingSourceUrl} />
      </div>
    </article>
  );
};

export default function PostContent({ html }: { html: string }) {
  return <div className="mt-16">{parse(html)}</div>;
}
