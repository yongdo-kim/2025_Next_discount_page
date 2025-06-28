/* eslint-disable @next/next/no-img-element */
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import Link from "next/link";
import { postKeys } from "../../infrastructure/contstant/query-keys";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { htmlToText } from "html-to-text";

export default function PostCardMiddle({ post }: { post: PostPreviewEntity }) {
  const content = htmlToText(post.content);

  return (
    <div className="hover:bg-accent w-full cursor-pointer rounded-2xl">
      <Link href={`/post/${post.id}`}>
        <div
          onMouseEnter={() => {
            queryClient.prefetchQuery({
              queryKey: [postKeys.detail(post.id)],
              queryFn: () => container.postService.getPostDetail(post.id),
            });
          }}
        >
          <div className="relative">
            <img
              src={post.thumbnailUrl || ""}
              className="rounded-2xl object-cover"
              alt={post.title}
              width={600}
              height={400}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
              <div className="line-clamp-1 text-lg font-medium">
                {post.title}
              </div>
              <div className="line-clamp-2 text-sm font-medium text-neutral-200">
                {content}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
