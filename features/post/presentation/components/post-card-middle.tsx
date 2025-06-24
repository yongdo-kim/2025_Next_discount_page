import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import Image from "next/image";
import Link from "next/link";
import { PostEntity } from "../../domain/entities/post.entity";
import { postKeys } from "../../infrastructure/contstant/query-keys";

export default function PostCardMiddle({ post }: { post: PostEntity }) {
  return (
    <div className="hover:bg-accent relative h-[200px] w-[300px] cursor-pointer rounded-2xl md:h-[240px] md:w-[340px]">
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
            <Image
              src={post.imageUrl || ""}
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
                {post.content}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
