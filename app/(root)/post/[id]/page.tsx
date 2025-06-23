

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
  console.log(params);
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: postKeys.detail(id),
    queryFn: async () => {
      const post = await container.postService.getPostDetail(id);
      return JSON.parse(JSON.stringify(post));
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetail postId={id} />
    </HydrationBoundary>
  );
}
