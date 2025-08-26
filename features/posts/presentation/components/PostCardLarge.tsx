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
import Image from "next/image";
import Link from "next/link";

export default function PostCardLarge({
  post,
  isAuthorVisible = true,
  isDescVisible = true,
}: {
  post: PostPreviewEntity;
  isAuthorVisible?: boolean;
  isDescVisible?: boolean;
}) {
  // const content = htmlToText(post.content);

  // createdAt이 string인 경우 Date 객체로 변환
  // const createdAt = post.createdAt ? post.createdAt : new Date();

  // 현재 시간과의 차이를 계산 (예: "2시간 전")
  // const timeAgo = formatDistanceToNow(createdAt, {
  //   addSuffix: true,
  //   locale: ko, // 한국어 설정
  // });

  return (
    <Link href={`/posts/${post.id}`} data-testid="post-card-large-link">
      <Card
        className="hover:bg-accent h-full cursor-pointer p-4"
        onMouseEnter={() => {
          queryClient.prefetchQuery({
            queryKey: [postKeys.detail(post.id)],
            queryFn: () => container.postService.getPostDetail(post.id),
          });
        }}
        data-testid="post-card-large"
      >
        <div
          className="flex items-center gap-2"
          data-testid="post-card-large-tags"
        >
          {post.tags?.slice(0, 3).map((tag) => (
            <Badge
              variant="outline"
              className="text-md"
              key={tag.id}
              data-testid="post-card-large-tag"
            >
              {tag.name}
            </Badge>
          ))}
          {post.tags?.length === 0 && (
            <Badge
              variant="outline"
              className="text-md"
              data-testid="post-card-large-tag-default"
            >
              {"#"}
            </Badge>
          )}
        </div>
        {post.thumbnailUrl ? (
          <SmartImage
            src={post.thumbnailUrl}
            className="aspect-video w-full rounded-xl object-cover"
            alt="썸네일"
            width={400}
            height={200}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            data-testid="post-card-large-image"
          />
        ) : (
          <div className="aspect-video w-full rounded-xl bg-gray-200" />
        )}
        <CardHeader className="px-2" data-testid="post-card-large-header">
          {/* 상단 */}
          <CardTitle
            className="line-clamp-2 text-lg font-bold whitespace-normal"
            data-testid="post-card-large-title"
          >
            {post.title}
          </CardTitle>
          {/* 중단 */}
          {isDescVisible && (
            <CardDescription
              className="line-clamp-2"
              data-testid="post-card-large-description"
            >
              {/* {content} */}
            </CardDescription>
          )}
          {/* 하단 */}

          {isAuthorVisible && (
            <CardDescription
              className="mt-2"
              data-testid="post-card-large-meta"
            >
              <div
                className="flex items-center justify-between"
                data-testid="post-card-large-author-info"
              >
                <div
                  className="flex items-center justify-center gap-2"
                  data-testid="post-card-large-author-details"
                >
                  <CardDescription data-testid="post-card-large-author-avatar">
                    <Image
                      src="/discount-character.webp"
                      alt={post.author.nickname}
                      className="aspect-square rounded-full"
                      width={20}
                      height={20}
                      sizes="20px"
                    />
                  </CardDescription>
                  <div
                    className="text-sm text-neutral-800 dark:text-neutral-50"
                    data-testid="post-card-large-author-nickname"
                  >
                    {post.author.nickname}
                  </div>
                </div>
                {/* <div
                  className="text-sm text-neutral-500 dark:text-neutral-400"
                  data-testid="post-card-large-created-at"
                >
                  {timeAgo}
                </div> */}
              </div>
            </CardDescription>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
}
