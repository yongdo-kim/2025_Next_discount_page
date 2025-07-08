import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PostPreviewEntity } from "../../domain/entities/post-preview.entity";
import SmartImage from "@/components/ui/smart-image";

export default function PostCardSmall({ post }: { post: PostPreviewEntity }) {
  return (
    <>
      {/* 모바일 전용 */}
      <div className="block md:hidden">
        <MobileCard post={post} />
      </div>
      {/* 데스크탑 전용 */}
      <div className="hidden md:block">
        <DesktopCard post={post} />
      </div>
    </>
  );
}
function MobileCard({ post }: { post: PostPreviewEntity }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="flex w-full cursor-pointer flex-row">
        {/* 이미지 */}
        <div className="h-20 w-24 flex-shrink-0 rounded-2xl">
          <SmartImage
            src={post.thumbnailUrl || ""}
            className="h-full w-full rounded-2xl object-cover"
            alt={post.title}
            width={96}
            height={80}
          />
        </div>
        {/* 내용 */}
        <div className="px-6">
          {/* 태그 */}
          <div className="flex flex-wrap items-center gap-2 pb-1">
            {post.tags.length > 0 ? (
              post.tags.slice(0, 2).map((tag) => (
                <Badge variant="outline" key={tag.id} className="text-sm">
                  {tag.name}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="text-sm">
                {"#"}
              </Badge>
            )}
          </div>
          {/* 제목 */}
          <div className="text-md line-clamp-2 pt-2 font-bold whitespace-normal">
            {post.title}
          </div>
        </div>
      </div>
    </Link>
  );
}

function DesktopCard({ post }: { post: PostPreviewEntity }) {
  return (
    <div className="group w-full cursor-pointer">
      <Link href={`/posts/${post.id}`}>
        <div className="flex flex-col">
          {/* 이미지 + 뱃지/타이틀 오버레이 */}
          <div className="relative overflow-hidden rounded-2xl ">
            <SmartImage
              src={post.thumbnailUrl || ""}
              className="h-[160px] w-[200px] sm:h-[160px] sm:w-[300px] rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105 lg:h-[200px] lg:w-[250px]"
              alt={post.title}
              width={180}
              height={120}
            />
            {/* 오버레이: 뱃지 + 타이틀 */}
            <div className="absolute top-0 left-0 flex h-full w-full flex-col justify-between bg-black/40 p-3">
              <div className="flex items-center gap-2">
                {post.tags.length > 0 ? (
                  post.tags.slice(0, 2).map((tag) => (
                    <Badge
                      variant="outline"
                      key={tag.id}
                      className="border-none bg-white/80 text-xs text-black shadow lg:text-sm"
                    >
                      {tag.name}
                    </Badge>
                  ))
                ) : (
                  <Badge
                    variant="outline"
                    className="border-none bg-white/80 text-xs text-black shadow"
                  >
                    {"#"}
                  </Badge>
                )}
              </div>
              <div className="line-clamp-2 text-2xl font-bold whitespace-normal text-white drop-shadow">
                {post.title}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
