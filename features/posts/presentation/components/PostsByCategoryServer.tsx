import { categoryKeys } from "@/features/categories/infrastructure/contstant/query-keys";
import PostsByCategoryClient from "@/features/posts/presentation/components/PostsByCategoryClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

type PostsByCategoryServerProps = {
  categoryId: string;
};

export default async function PostsByCategoryServer({
  categoryId,
}: PostsByCategoryServerProps) {
  // 카테고리별 포스트 데이터를 prefetch
  await queryClient
    .fetchQuery({
      queryKey: categoryKeys.postPreviews(parseInt(categoryId), 20),
      queryFn: async () => {
        const posts = await container.postService.getPostPreviews({
          req: { categoryId: parseInt(categoryId), limit: 20 },
        });
        return JSON.parse(JSON.stringify(posts));
      },
    })
    .catch(() => []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsByCategoryClient categoryId={categoryId} />
    </HydrationBoundary>
  );
}
