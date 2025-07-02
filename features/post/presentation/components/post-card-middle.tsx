/* eslint-disable @next/next/no-img-element */
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { htmlToText } from "html-to-text";
import Link from "next/link";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export default function PostCardMiddle({ post }: { post: PostPreviewEntity }) {
  const content = htmlToText(post.content);

  return (
    <div className="hover:bg-accent group w-full cursor-pointer rounded-2xl">
      <Link href={`/posts/${post.id}`}>
        <div
          onMouseEnter={() => {
            queryClient.prefetchQuery({
              queryKey: [postKeys.detail(post.id)],
              queryFn: () => container.postService.getPostDetail(post.id),
            });
          }}
        >
          <div className="relative h-[400px] transition-transform duration-300 group-hover:scale-105">
            <img
              src={post.thumbnailUrl || ""}
              className="h-[400px] rounded-2xl object-cover"
              alt={post.title}
              width={700}
              height={400}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
              <div className="line-clamp-1 text-xl font-bold">{post.title}</div>
              <div className="line-clamp-1 text-lg font-medium text-neutral-300 w-[200px]">
                {content}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
