import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import MyDiscountClient from "@/features/users/presentation/components/MyDiscountClient";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function MyDiscountServer() {
  // 내가 좋아한 할인 데이터를 prefetch
  await queryClient
    .fetchQuery({
      queryKey: [usersKeys.likedPosts(8)],
      queryFn: async () => {
        const discounts = await container.userService.getLikedPosts();
        return JSON.parse(JSON.stringify(discounts));
      },
    })
    .catch(() => []);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyDiscountClient />
    </HydrationBoundary>
  );
}
