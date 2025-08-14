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
      <div className="block sm:hidden" data-testid="post-card-middle-mobile">
        <MobileCard post={post} priority={priority} />
      </div>
      {/* 데스크탑 전용 */}
      <div className="hidden sm:block" data-testid="post-card-middle-desktop">
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
    <div
      className="w-full cursor-pointer rounded-2xl"
      data-testid="post-card-middle-mobile-container"
    >
      <Link
        href={`/posts/${post.id}`}
        data-testid="post-card-middle-mobile-link"
      >
        <div data-testid="post-card-middle-mobile-card">
          <div
            className="relative"
            data-testid="post-card-middle-mobile-image-wrapper"
          >
            <SmartImage
              src={post.thumbnailUrl || ""}
              className="h-[180px] w-full rounded-2xl object-cover"
              alt="썸네일"
              width={320}
              height={160}
              sizes="(max-width: 640px) 100vw, 320px"
              priority={priority}
              data-testid="post-card-middle-mobile-image"
            />
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 to-transparent"
              data-testid="post-card-middle-mobile-overlay"
            />
            <div
              className="absolute right-0 bottom-0 left-0 p-4 text-white"
              data-testid="post-card-middle-mobile-content"
            >
              <div
                className="line-clamp-2 text-base font-bold"
                data-testid="post-card-middle-mobile-title"
              >
                {post.title}
              </div>
              <div
                className="line-clamp-1 text-xs font-medium text-neutral-300"
                data-testid="post-card-middle-mobile-description"
              >
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
    <div
      className="hover:bg-accent group w-full cursor-pointer rounded-2xl"
      data-testid="post-card-middle-desktop-container"
    >
      <Link
        href={`/posts/${post.id}`}
        data-testid="post-card-middle-desktop-link"
      >
        <div
          onMouseEnter={() => {
            queryClient.prefetchQuery({
              queryKey: [postKeys.detail(post.id)],
              queryFn: () => container.postService.getPostDetail(post.id),
            });
          }}
          data-testid="post-card-middle-desktop-card"
        >
          <div
            className="relative h-[250px] transition-transform duration-300 group-hover:scale-105 lg:h-[300px]"
            data-testid="post-card-middle-desktop-image-wrapper"
          >
            <SmartImage
              src={post.thumbnailUrl || ""}
              className="h-[250px] rounded-2xl object-cover lg:h-[300px]"
              alt="썸네일"
              width={700}
              height={300}
              sizes="(max-width: 1024px) 50vw, 700px"
              data-testid="post-card-middle-desktop-image"
            />
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 to-transparent"
              data-testid="post-card-middle-desktop-overlay"
            />
            <div
              className="absolute right-0 bottom-0 left-0 p-2 text-white"
              data-testid="post-card-middle-desktop-content"
            >
              <div
                className="line-clamp-1 text-lg font-bold lg:text-xl"
                data-testid="post-card-middle-desktop-title"
              >
                {post.title}
              </div>
              <div
                className="line-clamp-1 w-[200px] overflow-hidden text-base font-medium text-neutral-300 lg:text-lg"
                data-testid="post-card-middle-desktop-description"
              >
                {content}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
