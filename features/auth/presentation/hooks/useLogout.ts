import { postKeys } from "@/features/posts/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { queryClient } from "@/lib/react-query";
import { captureException } from "@sentry/nextjs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogout() {
  return useMutation({
    mutationFn: () => container.authService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      window.location.replace("/");
    },
    onError: (e) => {
      captureException(e);
      toast.error("로그아웃 실패");
    },
  });
}
