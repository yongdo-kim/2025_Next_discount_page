import { Badge } from "@/components/shadcn/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import SmartImage from "@/components/ui/SmartImage";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { postKeys } from "@/features/posts/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale/ko";

import Link from "next/link";

export default function PostListItem({ post }: { post: PostPreviewEntity }) {
  // const content = htmlToText(post.content).replace(/\n/g, " ");
  // createdAt이 string인 경우 Date 객체로 변환
  const createdAt = post.createdAt ? post.createdAt : new Date();

  // 현재 시간과의 차이를 계산 (예: "2시간 전")
  const timeAgo = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ko, // 한국어 설정
  });

  return (
    <Link href={`/posts/${post.id}`} data-testid="post-link">
      <Card
        className="hover:bg-accent w-full cursor-pointer p-2"
        data-testid="post-card"
        onMouseEnter={() => {
          queryClient.prefetchQuery({
            queryKey: [postKeys.detail(post.id)],
            queryFn: () => container.postService.getPostDetail(post.id),
          });
        }}
      >
        <CardHeader className="w-full px-2" data-testid="post-header">
          <div
            className="flex min-w-0 items-center justify-between"
            data-testid="post-content-wrapper"
          >
            <div
              className="flex min-w-0 flex-1 flex-col justify-between"
              data-testid="post-text-content"
            >
              <BadgeList post={post} />
              {/* 타이틀 */}
              <CardTitle className="pb-2 font-bold" data-testid="post-title">
                {post.title}
              </CardTitle>
              {/* 설명 */}
              <CardDescription
                className="line-clamp-2"
                data-testid="post-description"
              >
                {/* {content} */}
              </CardDescription>
              {/* 작성자 */}
              <CardDescription className="mt-2" data-testid="post-meta">
                <div
                  className="flex items-center"
                  data-testid="post-author-info"
                >
                  <div
                    className="flex items-center justify-center gap-2"
                    data-testid="post-author-details"
                  >
                    <CardDescription data-testid="post-author-avatar">
                      {post.author.picture ? (
                        <SmartImage
                          src={post.author.picture}
                          alt={post.author.nickname}
                          className="aspect-square rounded-full"
                          width={20}
                          height={20}
                          sizes="20px"
                        />
                      ) : (
                        <div className="flex aspect-square h-5 w-5 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
                          <span className="text-xs text-gray-500">👤</span>
                        </div>
                      )}
                    </CardDescription>
                    <div
                      className="text-sm text-neutral-800 dark:text-neutral-50"
                      data-testid="post-author-nickname"
                    >
                      {post.author.nickname}
                    </div>
                  </div>
                  <div
                    className="pl-2 text-xs text-neutral-500 dark:text-neutral-400"
                    data-testid="post-created-at"
                  >
                    {timeAgo}
                  </div>
                </div>
              </CardDescription>
            </div>
            {/* 이미지 */}
            {post.thumbnailUrl ? (
              <SmartImage
                src={post.thumbnailUrl}
                className="ml-2 h-[100px] w-[120px] rounded-xl object-cover"
                alt="썸네일"
                width={120}
                height={100}
                sizes="120px"
                data-testid="post-thumbnail"
              />
            ) : (
              <div
                className="ml-2 flex h-[100px] w-[120px] items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-700"
                data-testid="post-thumbnail-placeholder"
              >
                <span className="text-xs text-gray-400">이미지 없음</span>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

const BadgeList = ({ post }: { post: PostPreviewEntity }) => {
  return (
    <div className="m-0 flex items-center pb-4" data-testid="post-tags">
      {post.tags?.map((tag) => (
        <Badge
          variant="outline"
          className="text-xs text-neutral-400"
          key={tag.id}
          data-testid="post-tag"
        >
          {tag.name}
        </Badge>
      ))}
      {post.tags?.length === 0 && (
        <Badge
          variant="outline"
          className="text-xs text-neutral-400"
          data-testid="post-tag-default"
        >
          {"#"}
        </Badge>
      )}
    </div>
  );
};
