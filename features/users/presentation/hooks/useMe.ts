import { usersKeys } from "@/features/users/infrastructure/contstant/query-keys";
import { container } from "@/lib/di/dependencies";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useMe(enable: boolean = true) {
  const router = useRouter();

  const query = useQuery({
    queryKey: usersKeys.me,
    queryFn: () => container.userService.getMe(),
    enabled: enable,
    retry: false, // 인증 실패 시 재시도하지 않음
  });

  // 인증 오류 시 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (query.isError && query.error) {
      router.push("/auth/sign-in");
    }
  }, [query.isError, query.error, router]);

  return query;
}
