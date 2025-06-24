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
import Image from "next/image";
import Link from "next/link";
import { PostEntity } from "../../domain/entities/post.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export default function PostCardLarge({ post }: { post: PostEntity }) {
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
        className="p-4 cursor-pointer hover:bg-accent "
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
        <Image
          src={post.imageUrl || ""}
          className="rounded-xl aspect-video w-full object-cover"
          alt={post.title}
          width={400}
          height={200}
        />
        <CardHeader className="px-2">
          {/* 상단 */}
          <CardTitle className="line-clamp-1 font-bold">{post.title}</CardTitle>
          {/* 중단 */}
          <CardDescription className="line-clamp-2">
            {post.content}
          </CardDescription>
          {/* 하단 */}

          <CardDescription className="mt-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center gap-2">
                <CardDescription>
                  <Image
                    src={post.user.profileImageUrl}
                    alt={post.user.nickname}
                    className="rounded-full aspect-square"
                    width={20}
                    height={20}
                  />
                </CardDescription>
                <div className="text-neutral-800 dark:text-neutral-50 text-sm">
                  {post.user.nickname}
                </div>
              </div>
              <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                {timeAgo}
              </div>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
