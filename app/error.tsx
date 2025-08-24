"use client";

import { useGsapFillHover } from "@/lib/hooks/use-gsap-fill-hover";
import * as Sentry from "@sentry/nextjs";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const fillRef = useGsapFillHover<HTMLButtonElement>();
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div
      data-testid="error-page-container"
      className="flex flex-col items-center justify-center pt-40"
    >
      <ErrorCharacter />
      <div
        data-testid="error-page-content"
        className="w-1/2 rounded-lg p-6 text-center shadow-md"
      >
        <h1 data-testid="error-page-title" className="mb-4 text-3xl font-bold">
          문제가 발생했어요
        </h1>
        <p data-testid="error-page-message" className="text-xl">
          잠시 후 다시 시도해주세요.
        </p>
        <div data-testid="error-page-actions" className="mt-8 space-y-3">
          <div>
            <button
              ref={fillRef}
              onClick={() => (window.location.href = "/")}
              data-testid="error-page-home-button"
              className="text-md m-2 cursor-pointer rounded-full border border-emerald-400 p-3"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ErrorCharacter = () => {
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (characterRef.current) {
      gsap.to(characterRef.current, {
        opacity: 0.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, []);

  return (
    <>
      <div
        ref={characterRef}
        data-testid="error-character-container"
        className="relative flex flex-col items-center"
      >
        <div
          data-testid="error-character-speech-bubble"
          className="relative mb-4"
        >
          <div
            data-testid="error-character-speech-text"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-lg"
          >
            앗! 뭔가 잘못되었네요 ㅠㅠ
          </div>
          <div
            data-testid="error-character-speech-tail"
            className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-t-white border-r-transparent border-l-transparent"
          ></div>
        </div>
        <Image
          src="/discount-character-1024.webp"
          alt="할인탐정 캐릭터"
          width={160}
          height={160}
          priority
          data-testid="error-character-image"
        />
      </div>
    </>
  );
};
