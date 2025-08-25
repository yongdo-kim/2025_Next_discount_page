import { Badge } from "@/components/shadcn/badge";
import SmartImage from "@/components/ui/SmartImage";
import { PostPreviewEntity } from "@/features/posts/domain/entities/post-preview.entity";
import Link from "next/link";

export default function PostCardSmall({
  post,
  priority = false,
}: {
  post: PostPreviewEntity;
  priority?: boolean;
}) {
  return (
    <>
      {/* 모바일 전용 */}
      <div className="block md:hidden">
        <MobileCard post={post} priority={priority} />
      </div>
      {/* 데스크탑 전용 */}
      <div className="hidden md:block">
        <DesktopCard post={post} priority={priority} />
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
  return (
    <Link href={`/posts/${post.id}`} data-testid="post-card-small-mobile-link">
      <div
        className="flex w-full cursor-pointer flex-row"
        data-testid="post-card-small-mobile-container"
      >
        {/* 이미지 */}
        <div className="h-20 w-24 flex-shrink-0 rounded-2xl">
          {post.thumbnailUrl ? (
            <SmartImage
              src={post.thumbnailUrl}
              className="h-full w-full rounded-2xl object-cover"
              alt="썸네일"
              width={96}
              height={80}
              sizes="96px"
              priority={priority}
            />
          ) : (
            <div className="h-full w-full rounded-2xl bg-gray-200" />
          )}
        </div>
        {/* 내용 */}
        <div className="px-6">
          {/* 태그 */}
          <div
            className="flex flex-wrap items-center gap-2 pb-1"
            data-testid="post-card-small-mobile-tags"
          >
            {post.tags.length > 0 ? (
              post.tags.slice(0, 2).map((tag) => (
                <Badge
                  variant="outline"
                  key={tag.id}
                  className="text-sm"
                  data-testid="post-card-small-mobile-tag"
                >
                  {tag.name}
                </Badge>
              ))
            ) : (
              <Badge
                variant="outline"
                className="text-sm"
                data-testid="post-card-small-mobile-tag-default"
              >
                {"#"}
              </Badge>
            )}
          </div>
          {/* 제목 */}
          <div
            className="text-md line-clamp-2 pt-2 font-bold whitespace-normal"
            data-testid="post-card-small-mobile-title"
          >
            {post.title}
          </div>
        </div>
      </div>
    </Link>
  );
}

function DesktopCard({
  post,
  priority,
}: {
  post: PostPreviewEntity;
  priority?: boolean;
}) {
  return (
    <div
      className="group w-full cursor-pointer"
      data-testid="post-card-small-desktop-container"
    >
      <Link
        href={`/posts/${post.id}`}
        data-testid="post-card-small-desktop-link"
      >
        <div
          className="flex flex-col"
          data-testid="post-card-small-desktop-card"
        >
          {/* 이미지 + 뱃지/타이틀 오버레이 */}
          <div
            className="relative overflow-hidden rounded-2xl"
            data-testid="post-card-small-desktop-image-wrapper"
          >
            {post.thumbnailUrl ? (
              <SmartImage
                src={post.thumbnailUrl}
                className="h-[160px] w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                alt="썸네일"
                width={180}
                height={120}
                sizes="(max-width: 640px) 200px, w-full"
                priority={priority}
                data-testid="post-card-small-desktop-image"
              />
            ) : (
              <div className="h-[160px] w-full rounded-2xl bg-gray-200" />
            )}
            {/* 오버레이: 뱃지 + 타이틀 */}
            <div
              className="absolute top-0 left-0 flex h-full w-full flex-col justify-between bg-black/40 p-3"
              data-testid="post-card-small-desktop-overlay"
            >
              <div
                className="flex items-center gap-2"
                data-testid="post-card-small-desktop-tags"
              >
                {post.tags.length > 0 ? (
                  post.tags.slice(0, 2).map((tag) => (
                    <Badge
                      variant="outline"
                      key={tag.id}
                      className="border-none bg-white/80 text-xs text-black shadow lg:text-sm"
                      data-testid="post-card-small-desktop-tag"
                    >
                      {tag.name}
                    </Badge>
                  ))
                ) : (
                  <Badge
                    variant="outline"
                    className="border-none bg-white/80 text-xs text-black shadow"
                    data-testid="post-card-small-desktop-tag-default"
                  >
                    {"#"}
                  </Badge>
                )}
              </div>
              <div
                className="text-md line-clamp-2 font-bold whitespace-normal text-white drop-shadow"
                data-testid="post-card-small-desktop-title"
              >
                {post.title}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
