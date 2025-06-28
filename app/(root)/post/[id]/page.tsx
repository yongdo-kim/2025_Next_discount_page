import ScrollHideNavbar from "@/components/navbar/scroll-hide-navbar";
import { PostEntity } from "@/features/post/domain/entities/post.entity";
import { postKeys } from "@/features/post/infrastructure/contstant/query-keys";
import { PostDetail } from "@/features/post/presentation/components/post-detail";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // await으로 받아야 함!
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
  }

  const post = queryClient.getQueryData<PostEntity>(postKeys.detail(numId));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ScrollHideNavbar />
      <PostDetail postId={numId} initialPost={post} />
    </HydrationBoundary>
  );
}
