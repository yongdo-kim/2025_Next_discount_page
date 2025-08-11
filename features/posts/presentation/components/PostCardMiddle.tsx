import SmartImage from "@/components/ui/SmartImage";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import { postKeys } from "@/features/posts/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { htmlToText } from "html-to-text";
import Link from "next/link";

export default function PostCardMiddle({
  post,
  priority,
}: {
  post: PostPreviewEntity;
  priority?: boolean;
}) {
  return (
    <>
      {/* 모바일 전용 */}
      <div className="block sm:hidden">
        <MobileCard post={post} priority={priority} />
      </div>
      {/* 데스크탑 전용 */}
      <div className="hidden sm:block">
        <DesktopCard post={post} />
      </div>
    </>
  );
}

function MobileCard({
  post,
  priority,
}: {
  post: PostPreviewEntity;
  priority?: boolean;
}) {
  const content = htmlToText(post.content);

  return (
    <div className="w-full cursor-pointer rounded-2xl">
      <Link href={`/posts/${post.id}`}>
        <div>
          <div className="relative">
            <SmartImage
              src={post.thumbnailUrl || ""}
              className="h-[180px] w-full rounded-2xl object-cover"
              alt="썸네일"
              width={320}
              height={160}
              sizes="(max-width: 640px) 100vw, 320px"
              priority={priority}
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
          <div className="relative h-[250px] transition-transform duration-300 group-hover:scale-105 lg:h-[300px]">
            <SmartImage
              src={post.thumbnailUrl || ""}
              className="h-[250px] rounded-2xl object-cover lg:h-[300px]"
              alt="썸네일"
              width={700}
              height={300}
              sizes="(max-width: 1024px) 50vw, 700px"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-2 text-white">
              <div className="line-clamp-1 text-lg font-bold lg:text-xl">
                {post.title}
              </div>
              <div className="line-clamp-1 w-[200px] overflow-hidden text-base font-medium text-neutral-300 lg:text-lg">
                {content}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
