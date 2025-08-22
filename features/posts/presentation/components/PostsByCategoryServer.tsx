import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import PostsByCategoryClient from "@/features/posts/presentation/components/PostsByCategoryClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

type PostsByCategoryServerProps = {
  categoryId: string;
  limit?: number;
};

export default async function PostsByCategoryServer({
  categoryId,
  limit = 10,
}: PostsByCategoryServerProps) {
  // 카테고리별 포스트 데이터를 prefetch
  await queryClient
    .fetchQuery({
      queryKey: categoryKeys.postPreviews(parseInt(categoryId), limit),
      queryFn: async () => {
        const posts = await container.postService.getPostPreviews({
          req: { categoryId: parseInt(categoryId), limit },
        });
        return JSON.parse(JSON.stringify(posts));
      },
    })
    .catch(() => []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsByCategoryClient categoryId={categoryId} limit={limit} />
    </HydrationBoundary>
  );
}
