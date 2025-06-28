/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale/ko";
import { htmlToText } from "html-to-text";
import Link from "next/link";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export default function PostCardLarge({ post }: { post: PostPreviewEntity }) {
  const content = htmlToText(post.content);

  // createdAt이 string인 경우 Date 객체로 변환
  const createdAt = post.createdAt ? post.createdAt : new Date();

  // 현재 시간과의 차이를 계산 (예: "2시간 전")
  const timeAgo = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ko, // 한국어 설정
  });

  return (
    <Link href={`/post/${post.id}`}>
      <Card
        className="hover:bg-accent cursor-pointer p-4"
        onMouseEnter={() => {
          queryClient.prefetchQuery({
            queryKey: [postKeys.detail(post.id)],
            queryFn: () => container.postService.getPostDetail(post.id),
          });
        }}
      >
        <div className="flex items-center gap-2">
          {post.tags.map((tag) => (
            <Badge variant="outline" className="text-xs" key={tag.id}>
              {tag.name}
            </Badge>
          ))}
        </div>
        <img
          src={post.thumbnailUrl || ""}
          className="aspect-video w-full rounded-xl object-cover"
          alt={post.title}
          width={400}
          height={200}
        />
        <CardHeader className="px-2">
          {/* 상단 */}
          <CardTitle className="line-clamp-1 font-bold">{post.title}</CardTitle>
          {/* 중단 */}
          <CardDescription className="line-clamp-2">{content}</CardDescription>
          {/* 하단 */}

          <CardDescription className="mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <CardDescription>
                  <img
                    src={post.author.picture}
                    alt={post.author.nickname}
                    className="aspect-square rounded-full"
                    width={20}
                    height={20}
                  />
                </CardDescription>
                <div className="text-sm text-neutral-800 dark:text-neutral-50">
                  {post.author.nickname}
                </div>
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                {timeAgo}
              </div>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
