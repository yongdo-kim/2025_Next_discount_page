import MyDiscountClient from "@/features/users/presentation/components/MyDiscountClient";
import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function MyDiscountServer() {
  // 내가 좋아한 포스트 데이터를 prefetch
  await queryClient
    .fetchQuery({
      queryKey: usersKeys.likedPosts(),
      queryFn: async () => {
        const likedPosts = await container.userService.getLikedPosts();
        return JSON.parse(JSON.stringify(likedPosts));
      },
    })
    .catch(() => []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyDiscountClient />
    </HydrationBoundary>
  );
}
