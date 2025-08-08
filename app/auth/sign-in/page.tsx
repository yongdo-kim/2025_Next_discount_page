import Image from "next/image";
import { Suspense } from "react";
import GoogleLoginButton from "./GoogleLoginButton";

export const metadata = {
  title: "로그인 - 할인탐정",
  description: "할인탐정에 로그인하여 맞춤형 할인 정보를 받아보세요.",
};

export default function SignInPage() {
  return (
    <div className="my-auto flex h-full flex-col justify-between">
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center rounded-lg p-8 shadow-md">
          <Image
            src="/discount-character-1024.webp"
            alt="할인탐정 캐릭터"
            width={160}
            height={160}
            priority
          />
          <h1 className="mb-2 text-2xl font-bold text-amber-600">할인탐정</h1>
          <div className="mb-6 text-center text-lg text-neutral-100">
            할인은 우리가 수사합니다. <br />
            진짜 혜택만을 추적해 보여주는 스마트 쇼핑 도우미입니다
          </div>
          <Suspense fallback={
            <div className="mb-2 w-60 h-14 bg-gray-200 rounded animate-pulse"></div>
          }>
            <GoogleLoginButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
