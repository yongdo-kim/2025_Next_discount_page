import MyDiscountClient from "@/features/users/presentation/components/MyDiscountClient";
import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function MyDiscountServer() {
  await Promise.all([
    // 좋아요한 포스트 prefetch
    queryClient
      .fetchQuery({
        queryKey: [usersKeys.likedPosts(8)],
        queryFn: async () => {
          const likedPosts = await container.userService.getLikedPosts();
          return JSON.parse(JSON.stringify(likedPosts));
        },
      })
      .catch(() => []),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyDiscountClient />
    </HydrationBoundary>
  );
}
