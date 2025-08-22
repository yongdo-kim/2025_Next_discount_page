"use client";
import { API_BASE_URL } from "@/lib/constants";
import { container } from "@/lib/di/dependencies";
import { ROUTES } from "@/lib/routes";
import * as Sentry from "@sentry/nextjs";
import { gsap } from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const imageRef = useRef<HTMLImageElement>(null);

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
          await container.userService.getMe();
          window.location.replace(ROUTES.HOME);
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

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "none",
      });
    }
  }, []);

  return (
    <div className="container mx-auto flex h-full flex-col justify-between pt-64">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-screen-lg flex-col items-center rounded-lg p-8 shadow-md">
          <h1 className="mb-2 text-2xl font-bold text-emerald-400">
            로그인 중이에요!
          </h1>
          <h1 className="mb-2 text-2xl font-bold text-emerald-400">
            잠시만 기다려주세요
          </h1>
          <Image
            ref={imageRef}
            src="/discount-character-1024.webp"
            alt="할인탐정 캐릭터"
            width={160}
            height={160}
            sizes="160px"
            priority
          />
          <h1 className="mb-2 text-2xl font-bold text-emerald-400">할인탐정</h1>
          <div className="mb-6 text-center text-lg text-neutral-100">
            할인은 우리가 수사합니다. <br />
            진짜 혜택만을 추적해 보여주는 스마트 쇼핑 도우미입니다
          </div>
        </div>
      </div>
    </div>
  );
}
