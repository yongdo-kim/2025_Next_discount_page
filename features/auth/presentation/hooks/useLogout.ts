import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await container.authService.logout();
      queryClient.invalidateQueries({ queryKey: usersKeys.me });
      toast.success("로그아웃 되었습니다.");
      router.replace("/");
    } catch (e) {
      Sentry.captureException(e);
      toast.error("로그아웃 실패");
    }
  };

  return { logout };
}
