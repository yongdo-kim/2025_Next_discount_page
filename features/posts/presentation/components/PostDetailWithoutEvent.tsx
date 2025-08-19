"use client";
import { Badge } from "@/components/shadcn/badge";
import DividerLine from "@/components/ui/DividerLine";
import { PlatformTag } from "@/components/ui/PlatformTag";
import SmartImage from "@/components/ui/SmartImage";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { TagEntity } from "@/features/tags/domain/entities/tag.entity";
import { UserEntity } from "@/features/users/domain/entities/user.entity";
import { sendGAEvent } from "@/lib/ga";
import { splitTitleByPlatform } from "@/lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import { Bot, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";

const DynamicHtmlParser = dynamic(
  () => import("@/components/ui/DynamicHtmlParser"),
  {
    ssr: true,
  },
);

export const PostDetailWithoutEvent = ({ post }: { post: PostEntity }) => {
  const { platform, content } = splitTitleByPlatform(post.title);

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
      <TagList tags={post.tags} />

      {/* 제목 */}
      <h1
        className="mb-2 flex items-center gap-2 pt-2 text-3xl font-bold"
        data-testid="post-detail-title"
      >
        {platform && <PlatformTag platform={platform} />}
        <span>{content}</span>
      </h1>

      {/* 작성자, 작성일 */}
      <AuthorInfo user={post.author} createdAt={post.createdAt} />

      <DividerLine className="mt-4" />

      {/* 대표 이미지 */}
      <div className="flex w-full justify-center">
        <div
          className="relative mt-6 flex w-[400px] cursor-pointer justify-center"
          data-testid="post-detail-image-section"
          onClick={() => {
            sendGAEvent("post_detail_image_click", {
              post_id: post.id,
              post_title: post?.title,
              author_id: post?.author?.id,
              author_nickname: post?.author?.nickname,
            });
            return window.open(
              post.source?.originSourceUrl
                ? post.source.originSourceUrl
                : post.source?.scrapingSourceUrl,
              "_blank",
            );
          }}
        >
          <SmartImage
            src={post.imageUrl}
            alt={post.title}
            width={400}
            height={400}
            sizes="(max-width: 400px) 400px, 600px"
            className="mb-2 rounded-xl object-cover"
            data-testid="post-detail-static-image"
          />
          <div className="absolute right-2 bottom-4 z-1 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-sm text-white">
            <ExternalLink size={14} />
            바로가기
          </div>
        </div>
      </div>

      <DividerLine className="mt-10" />

      {/* 본문 */}
      <div
        className="flex w-full flex-col items-center justify-center pb-8 text-lg whitespace-pre-line text-neutral-900 dark:text-neutral-100"
        data-testid="post-detail-content"
      >
        <AiSummaryHeader />
        <PostContent html={post.content} />
      </div>

      {/* 자료출처 */}
      <div
        className="flex w-full justify-end border-t pt-4 pb-32"
        data-testid="post-detail-footer"
      >
        <SourceLink url={post.source?.scrapingSourceUrl} />
      </div>
    </article>
  );
};

export default function PostContent({ html }: { html: string }) {
  const newHTMl = html
    .replace(/^[`']{3}html\s*/im, "") // 맨 앞 ```html 또는 '''html 제거
    .replace(/^[`']{3}\s*$/gm, "") // 맨 뒤 ``` 또는 ''' 제거
    .replace(/정리\./g, "") // 특정 텍스트 제거
    .replace(
      /아래는 제공된 HTML 내용을 기반으로 주요 정보를 표로 요약한 것입니다\./g,
      "",
    ) // 특정 텍스트 제거
    .replace(
      /위 코드를 HTML 파일에 삽입하면 테이블 형태로 주요 내용을 볼 수 있습니다\./g,
      "",
    ) // 특정 텍스트 제거
    .replace(/.*HTML 내용.*/g, "") // HTML 내용이 포함된 라인 전체 제거
    .replace(/.*요약하여 포함.*/g, "") // 요약하여 포함이 포함된 라인 전체 제거
    .replace(/.*정리.*/g, "") // 정리가 포함된 라인 전체 제거
    .replace(/.*HTML 정보.*/g, "") // HTML 정보가 포함된 라인 전체 제거
    .replace(/.*HTML.*/g, "") // HTML이 포함된 라인 전체 제거
    .replace(/.*표.*/g, "") // 표가 포함된 라인 전체 제거
    .replace(/src="\/\//g, 'src="https://') // //로 시작하는 이미지 URL을 https://로 변환
    .trim();

  // img 태그를 포함하는 td가 있는 tr을 숨기기 위한 전처리
  const hideImageRows = (htmlContent: string): string => {
    // tr 태그 내에 img 태그가 있는 경우를 찾아서 해당 tr에 hidden 스타일 추가
    return htmlContent.replace(
      /<tr([^>]*)>([\s\S]*?)<\/tr>/gi,
      (match, attributes, content) => {
        // tr 내용에 img 태그가 있는지 확인
        if (content.includes("<img")) {
          // 기존 attributes가 있으면 유지하고 style="display: none;" 추가
          const existingStyle = attributes.match(
            /style\s*=\s*["']([^"']*?)["']/i,
          );
          if (existingStyle) {
            const updatedStyle = `style="${existingStyle[1]}; display: none;"`;
            const newAttributes = attributes.replace(
              /style\s*=\s*["'][^"']*?["']/i,
              updatedStyle,
            );
            return `<tr${newAttributes}>${content}</tr>`;
          } else {
            return `<tr${attributes} style="display: none;">${content}</tr>`;
          }
        }
        return match;
      },
    );
  };

  const processedHtml = hideImageRows(newHTMl);
  return (
    <div
      className="mt-16 max-w-none whitespace-pre-line"
      data-testid="post-content-section"
    >
      <div
        className="[&_*]:border [&_a]:text-blue-400 [&_a]:underline [&_img]:mx-auto [&_img]:h-auto [&_img]:max-w-full [&_table]:border-collapse [&_td]:p-2 [&_th]:bg-emerald-500 [&_th]:p-2 dark:[&_th]:bg-emerald-500"
        data-testid="post-content-html"
      >
        <DynamicHtmlParser html={processedHtml} />
      </div>
    </div>
  );
}

function TagList({ tags }: { tags: TagEntity[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-2" data-testid="post-detail-tags">
      {tags.map((tag) => (
        <Badge
          variant="outline"
          key={tag.id}
          className="md:text-md lg:text-lg"
          data-testid="post-detail-tag"
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}

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
    <div
      className="flex items-center rounded-lg bg-neutral-50 py-3 shadow-sm dark:bg-neutral-900"
      data-testid="post-detail-source-link"
    >
      <span
        className="mr-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300"
        data-testid="post-detail-source-label"
      >
        자료출처
      </span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate text-sm font-medium text-gray-400 underline hover:text-emerald-600"
        title={url}
        data-testid="post-detail-source-url"
      >
        {displayUrl}
      </a>
      <button
        onClick={handleCopy}
        className="ml-2 rounded bg-gray-400 px-2 py-1 text-xs font-semibold text-neutral-600 hover:bg-blue-100 hover:text-blue-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-blue-900"
        title="복사"
        type="button"
        data-testid="post-detail-source-copy-button"
      >
        복사
      </button>
    </div>
  );
}

function AiSummaryHeader() {
  return (
    <>
      <div className="mt-10 mb-2 flex items-center justify-center gap-2">
        <div className="relative">
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient
                id="robotGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#d1d5db" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>
            </defs>
            <Bot className="h-10 w-10" fill="url(#robotGradient)" />
          </svg>
        </div>
        <span className="text-lg font-semibold">
          <linearGradient
            id="robotGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#d1d5db" />
            <stop offset="100%" stopColor="#4b5563" />
          </linearGradient>
          AI가 할인 내용을 요약해드릴게요!
        </span>
      </div>
    </>
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
          className="pl-2 text-neutral-800 dark:text-gray-400"
          data-testid="post-detail-created-at"
        >
          {format(new Date(createdAt), "yyyy년 M월 d일", { locale: ko })}
        </div>
      </div>
    </div>
  );
}
