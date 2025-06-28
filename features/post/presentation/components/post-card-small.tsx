import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import Link from "next/link";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export default function PostCardSmall({ post }: { post: PostPreviewEntity }) {
  return (
    <div className="hover:bg-accent h-full w-[180px] cursor-pointer rounded-2xl border md:h-[240px] md:w-[240px]">
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
            className="aspect-auto w-full rounded-t-2xl object-cover"
            alt={post.title}
            width={180}
            height={180}
          />
          <div className="p-2">
            <div className="line-clamp-2 font-bold">{post.title}</div>
            <div className="line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">
              {post.content}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
