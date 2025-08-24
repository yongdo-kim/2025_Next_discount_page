import { PostEntity } from "@/features/posts/domain/entities/post.entity";
import { postKeys } from "@/features/posts/infrastructure/contstant/query-keys";
import { PostDetail } from "@/features/posts/presentation/components/PostDetail";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);
  try {
    const post = await container.postService.getPostDetail(numId);
    return {
      title: post.title ? `${post.title} | 할인탐정` : "할인탐정",
      description: post.content || "할인 정보 상세",
      openGraph: {
        title: post.title,
        description: post.content,
        images: post.source.originSourceUrl
          ? [{ url: post.source.originSourceUrl }]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.content,
        images: post.source.originSourceUrl
          ? [{ url: post.source.originSourceUrl }]
          : [],
      },
    };
  } catch {
    return {
      title: "게시글을 찾을 수 없습니다 | 할인탐정",
      description: "존재하지 않는 게시글입니다.",
    };
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  try {
    await queryClient.prefetchQuery({
      queryKey: postKeys.detail(numId),
      queryFn: async () => {
        const post = await container.postService.getPostDetail(numId);
        return JSON.parse(JSON.stringify(post));
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "404") {
      return notFound();
    }
    throw error;
  }

  const post = queryClient.getQueryData<PostEntity>(postKeys.detail(numId));
  const dehydratedState = dehydrate(queryClient);

  // 클래스 인스턴스를 plain object로 변환
  const serializedPost = post ? JSON.parse(JSON.stringify(post)) : null;

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostDetail postId={numId} initialPost={serializedPost} />
    </HydrationBoundary>
  );
}
