"use client";
import MainTitle from "@/components/MainTitle";
import { Badge } from "@/components/ui/badge";
import SmartImage from "@/components/ui/SmartImage";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { sendGAEvent } from "@/lib/ga";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import parse from "html-react-parser";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";
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
  // 상세 페이지 진입 시 GA 이벤트 전송
  useEffect(() => {
    sendGAEvent("post_detail_view_init", {
      post_id: postId,
      post_title: post?.title,
      author_id: post?.author?.id,
      author_nickname: post?.author?.nickname,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

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
  function SourceLink({ url }: { url?: string | null }) {
    if (!url) return null;

    const MAX_LENGTH = 40;
    let displayUrl = url;
    if (url.length > MAX_LENGTH) {
      displayUrl = url.slice(0, 30) + "..." + url.slice(-8);
    }

    // 클립보드 복사
    const handleCopy = () => {
      navigator.clipboard.writeText(url);
      toast("URL이 클립보드에 복사되었습니다.");
    };

    return (
      <div className="flex items-center rounded-lg bg-neutral-50 py-3 shadow-sm dark:bg-neutral-900">
        {/* 아이콘 */}

        <span className="mr-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
          자료출처
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm font-medium text-emerald-500 underline hover:text-emerald-600"
          title={url}
        >
          {displayUrl}
        </a>
        <button
          onClick={handleCopy}
          className="ml-2 rounded bg-neutral-200 px-2 py-1 text-xs font-semibold text-neutral-600 hover:bg-blue-100 hover:text-blue-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-blue-900"
          title="복사"
          type="button"
        >
          복사
        </button>
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
        <Image
          src="/discount-character.webp"
          alt={user.nickname}
          width={13}
          height={20}
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
    <article className="mx-auto mt-16 max-w-screen-xl px-4 py-6 md:px-32">
      {/* 태그 */}
      <TagList tags={post.tags} />

      {/* 제목 */}
      <h1 className="mb-2 pt-2 text-3xl font-bold">{post.title}</h1>

      {/* 작성자, 작성일 */}
      <AuthorInfo user={post.author} createdAt={post.createdAt} />

      {/* 대표 이미지 */}
      <div className="mt-8 mb-8">
        {post.source?.originSourceUrl ? (
          <div
            className="group relative mb-2 w-full cursor-pointer overflow-hidden"
            style={{ maxWidth: "100%", maxHeight: "350px" }}
            onClick={() =>
              window.open(
                post.source.originSourceUrl ?? "",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <SmartImage
              src={post.imageUrl}
              alt={post.title}
              width={600}
              height={400}
              className="w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ maxWidth: "100%", maxHeight: "350px" }}
            />
            {/* 검정 오버레이 */}
            <div className="absolute top-0 left-0 h-full w-full rounded-xl bg-black opacity-40" />
            {/* 바로가기 아이콘 */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  post.source.originSourceUrl ?? "",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
              className="absolute right-3 bottom-3 flex items-center justify-center rounded-full bg-black/70 px-4 py-2 transition hover:bg-black/90"
              aria-label="원본 사이트로 이동"
            >
              {/* 외부링크(새창) 아이콘 SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="ml-1 text-xl font-semibold text-white">
                바로가기
              </span>
            </button>
          </div>
        ) : (
          <SmartImage
            src={post.imageUrl}
            alt={post.title}
            width={600}
            height={400}
            className="mb-2 w-full rounded-xl object-cover"
            style={{ maxWidth: "100%", maxHeight: "350px" }}
          />
        )}
        {/* 대표이미지-링크 */}
        <SourceLink url={post.source?.originSourceUrl} />
      </div>

      {/* 본문 */}
      <div className="w-full pb-8 text-lg whitespace-pre-line text-neutral-900 dark:text-neutral-100">
        <PostContent html={post.content} />
      </div>

      {/* 자료출처 */}
      <div className="border-t pt-4 pb-32">
        <SourceLink url={post.source?.scrapingSourceUrl} />
      </div>
    </article>
  );
};

export default function PostContent({ html }: { html: string }) {
  const newHTMl = html
    .replace(/^[`']{3}html\s*/im, "") // 맨 앞 ```html 또는 '''html 제거
    .replace(/^[`']{3}\s*$/gm, "") // 맨 뒤 ``` 또는 ''' 제거
    .trim();
  return (
    <div className="mt-16 max-w-none whitespace-pre-line">
      <MainTitle title={"정리"} coloredTitle="" showIcon={false} />
      <div className="my-4 py-8 [&_*]:border [&_a]:text-blue-400 [&_a]:underline [&_img]:mx-auto [&_img]:h-auto [&_img]:max-w-full [&_table]:border-collapse [&_td]:p-2 [&_th]:p-2">
        {parse(newHTMl)}
      </div>
    </div>
  );
}
