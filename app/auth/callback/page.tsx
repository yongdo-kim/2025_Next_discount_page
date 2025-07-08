"use client";
import { useUserStore } from "@/features/users/presentation/store/user.store";
import { API_BASE_URL } from "@/lib/constants";
import { container } from "@/lib/di/dependencies";
import { ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state"); // google, kakao 등 구분
      if (code && state) {
        try {
          const loginRes = await fetch(`${API_BASE_URL}/auth/${state}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-client-id": "web",
            },
            body: JSON.stringify({ code }),
            credentials: "include",
          });
          // 웹의 경우 200, 데이터는 따로 내려주지 않음.
          if (!loginRes.ok) throw new Error("로그인 처리 중 오류");

          // 로그인 성공 후 유저 정보 조회, 쿠키의 jwt를 자동으로 전송
          const user = await container.userService.getMe();
          useUserStore.setState({ user });

          setTimeout(() => {
            router.replace(ROUTES.HOME);
          }, 0);
        } catch (err) {
          Sentry.captureException(err); 
          alert(
            err instanceof Error
              ? err.message
              : "로그인 처리 중 오류가 발생했습니다.",
          );
          router.replace(ROUTES.SIGN_IN);
        } finally {
          // URL에서 code, state 등 쿼리스트링 제거
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        }
      }
    };
    authenticate();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>로그인 중</div>
    </div>
  );
}
