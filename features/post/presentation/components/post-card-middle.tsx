/* eslint-disable @next/next/no-img-element */
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { htmlToText } from "html-to-text";
import Link from "next/link";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export default function PostCardMiddle({ post }: { post: PostPreviewEntity }) {
  return (
    <>
      {/* 모바일 전용 */}
      <div className="block sm:hidden">
        <MobileCard post={post} />
      </div>
      {/* 데스크탑 전용 */}
      <div className="hidden sm:block">
        <DesktopCard post={post} />
      </div>
    </>
  );
}

function MobileCard({ post }: { post: PostPreviewEntity }) {
  const content = htmlToText(post.content);

  return (
    <div className="hover:bg-accent group w-full cursor-pointer rounded-2xl">
      <Link href={`/posts/${post.id}`}>
        <div>
          <div className="relative transition-transform duration-300 group-hover:scale-105">
            <img
              src={post.thumbnailUrl || ""}
              className="h-[180px] w-full rounded-2xl object-cover"
              alt={post.title}
              width={320}
              height={160}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
              <div className="line-clamp-2 text-base font-bold">
                {post.title}
              </div>
              <div className="line-clamp-1 text-xs font-medium text-neutral-300">
                {content}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function DesktopCard({ post }: { post: PostPreviewEntity }) {
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
              <div className="line-clamp-1 w-[200px] text-lg font-medium text-neutral-300">
                {content}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
