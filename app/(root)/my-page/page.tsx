import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import dynamic from "next/dynamic";

const DynamicUserProfileForm = dynamic(() => import("@/features/users/presentation/components/UserProfileForm"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-700" />,
});
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const metadata = {
  title: "마이페이지 - 할인탐정",
  description: "개인정보 수정 및 계정 설정을 관리하세요.",
};

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
      <DynamicUserProfileForm />
    </HydrationBoundary>
  );
}
