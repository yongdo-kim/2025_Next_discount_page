/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import Link from "next/link";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export default function PostCardSmall({ post }: { post: PostPreviewEntity }) {
  return (
    <div className="cursor-pointer md:h-[240px] md:w-[240px]">
      <Link href={`/post/${post.id}`}>
        <div
          onMouseEnter={() => {
            queryClient.prefetchQuery({
              queryKey: [postKeys.detail(post.id)],
              queryFn: () => container.postService.getPostDetail(post.id),
            });
          }}
        >
          <img
            src={post.thumbnailUrl || ""}
            className="aspect-auto h-[180px] w-full rounded-2xl object-cover"
            alt={post.title}
            width={180}
            height={200}
          />
        </div>
        <div className="p-2">
          <div className="flex items-center gap-2">
            {post.tags.length > 0 &&
              post.tags.slice(0, 2).map((tag) => (
                <Badge variant="outline" key={tag.id} className="text-md">
                  {tag.name}
                </Badge>
              ))}
            {!post.tags?.length && (
              <Badge variant="outline" className="text-md">
                {"#"}
              </Badge>
            )}
          </div>
          <div className="line-clamp-1 pt-2 text-lg font-bold">
            {post.title}
          </div>
        </div>
      </Link>
    </div>
  );
}
