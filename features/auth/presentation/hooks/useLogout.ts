import { useUserStore } from "@/features/users/presentation/store/user.store";
import { container } from "@/lib/di/dependencies";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const router = useRouter();
  const clearUser = useUserStore((s) => s.clearUser);

  const logout = async () => {
    try {
      await container.authService.logout();
      clearUser();
      toast.success("로그아웃 되었습니다.");
      router.replace("/");
    } catch (e) {
      toast.error("로그아웃 실패");
    }
  };

  return { logout };
}
