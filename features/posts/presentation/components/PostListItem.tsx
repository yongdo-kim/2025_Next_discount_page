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
import { htmlToText } from "html-to-text";
import Link from "next/link";

export default function PostListItem({ post }: { post: PostPreviewEntity }) {
  const content = htmlToText(post.content).replace(/\n/g, " ");
  // createdAt이 string인 경우 Date 객체로 변환
  const createdAt = post.createdAt ? post.createdAt : new Date();

  // 현재 시간과의 차이를 계산 (예: "2시간 전")
  const timeAgo = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ko, // 한국어 설정
  });

  return (
    <Link href={`/posts/${post.id}`}>
      <Card
        className="hover:bg-accent w-full cursor-pointer p-2"
        onMouseEnter={() => {
          queryClient.prefetchQuery({
            queryKey: [postKeys.detail(post.id)],
            queryFn: () => container.postService.getPostDetail(post.id),
          });
        }}
      >
        <CardHeader className="w-full px-2">
          <div className="flex min-w-0 items-center justify-between">
            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <BadgeList post={post} />
              {/* 타이틀 */}
              <CardTitle className="pb-2 font-bold">{post.title}</CardTitle>
              {/* 설명 */}
              <CardDescription className="line-clamp-2">
                {content}
              </CardDescription>
              {/* 작성자 */}
              <CardDescription className="mt-2">
                <div className="flex items-center">
                  <div className="flex items-center justify-center gap-2">
                    <CardDescription>
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
                        <div className="aspect-square w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-xs text-gray-500">👤</span>
                        </div>
                      )}
                    </CardDescription>
                    <div className="text-sm text-neutral-800 dark:text-neutral-50">
                      {post.author.nickname}
                    </div>
                  </div>
                  <div className="pl-2 text-xs text-neutral-500 dark:text-neutral-400">
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
              />
            ) : (
              <div className="ml-2 h-[100px] w-[120px] rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-xs">이미지 없음</span>
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
    <div className="m-0 flex items-center pb-4">
      {post.tags?.map((tag) => (
        <Badge
          variant="outline"
          className="text-xs text-neutral-400"
          key={tag.id}
        >
          {tag.name}
        </Badge>
      ))}
      {post.tags?.length === 0 && (
        <Badge variant="outline" className="text-xs text-neutral-400">
          {"#"}
        </Badge>
      )}
    </div>
  );
};
