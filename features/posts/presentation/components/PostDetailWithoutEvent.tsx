"use client";
import DividerLine from "@/components/ui/DividerLine";
import { PlatformTag } from "@/components/ui/PlatformTag";
import SmartImage from "@/components/ui/SmartImage";
import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { PostDetailHeader } from "./PostDetailHeader";
import { PostDetailFooter } from "./PostDetailFooter";
import { sendGAEvent } from "@/lib/ga";
import { splitTitleByPlatform } from "@/lib/utils";
import { Bot, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const DynamicHtmlParser = dynamic(
  () => import("@/components/ui/DynamicHtmlParser"),
  {
    ssr: true,
  },
);

export const PostDetailWithoutEvent = ({ post }: { post: PostEntity }) => {
  // post가 없는 경우 error 상태를 throw하여 error.tsx가 처리하도록 함
  if (!post) {
    throw new Error("게시글을 찾을 수 없습니다.");
  }

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
      className="container mx-auto px-4 py-6"
      data-testid="post-detail-article"
    >
      {/* Header with tags, author info, and like button */}
      <PostDetailHeader post={post} />

      {/* 제목 */}
      <h1
        className="mb-2 flex items-center gap-2 pt-2 text-3xl font-bold"
        data-testid="post-detail-title"
      >
        {platform && <PlatformTag platform={platform} />}
        <span>{content}</span>
      </h1>

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

      {/* Footer with source link */}
      <PostDetailFooter post={post} />
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
          AI가 할인 내용을 요약해드릴게요!
        </span>
      </div>
    </>
  );
}
