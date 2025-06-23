import ScrollHideNavbar from "@/components/scroll-hide-navbar";
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
  params: { id: string }; //[id]로 지정한 값이 온다.
}) {
  const { id } = params;
  try {
    await queryClient.prefetchQuery({
      queryKey: postKeys.detail(id),
      queryFn: async () => {
        const post = await container.postService.getPostDetail(id);
        return JSON.parse(JSON.stringify(post));
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "404") {
      return notFound();
    }
    console.log(error);
  }

  const post = queryClient.getQueryData<PostEntity>(postKeys.detail(id));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ScrollHideNavbar />
      <PostDetail postId={id} initialPost={post} />
    </HydrationBoundary>
  );
}
