import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import UserProfileForm from "@/features/users/presentation/components/UserProfileForm";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function MyPage() {
  await queryClient.prefetchQuery({
    queryKey: [usersKeys.me],
    queryFn: async () => {
      const user = await container.userService.getMe();
      return JSON.parse(JSON.stringify(user));
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserProfileForm />
    </HydrationBoundary>
  );
}
