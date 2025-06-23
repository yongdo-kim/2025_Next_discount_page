import ScrollHideNavbar from "@/components/scroll-hide-navbar";
import { postKeys } from "@/features/post/infrastructure/contstant/query-keys";
import { PostDetail } from "@/features/post/presentation/components/post-detail";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
export default async function PostDetailPage({
  params,
}: {
  params: { id: string }; //[id]로 지정한 값이 온다.
}) {
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: postKeys.detail(id),
    queryFn: async () => {
      try {
        const post = await container.postService.getPostDetail(id);
        return JSON.parse(JSON.stringify(post));
      } catch (error) {
        console.error("Failed to fetch post:", error);
        return null; // 또는 적절한 기본값 반환
      }
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScrollHideNavbar />
      <PostDetail postId={id} />
    </HydrationBoundary>
  );
}
