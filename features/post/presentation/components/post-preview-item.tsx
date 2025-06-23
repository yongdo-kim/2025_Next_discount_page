import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale/ko";
import Image from "next/image";
import { PostEntity } from "../../domain/entities/post.entity";

export const PostPreviewItem = ({ post }: { post: PostEntity }) => {
  // createdAt이 string인 경우 Date 객체로 변환
  const createdAt = post.createdAt ? post.createdAt : new Date();

  // 현재 시간과의 차이를 계산 (예: "2시간 전")
  const timeAgo = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: ko, // 한국어 설정
  });

  return (
    <Card className="px-4 py-4 cursor-pointer hover:bg-accent">
      <Badge variant="outline" className="text-xs my-0">
        Tag
      </Badge>
      <Image
        src={post.imageUrl || ""}
        className="rounded-xl aspect-video w-full"
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
                  className="rounded-full"
                  width={25}
                  height={25}
                />
              </CardDescription>
              <div className="text-black text-sm">{post.user.nickname}</div>
            </div>
            <div className="text-black text-sm">{timeAgo}</div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
