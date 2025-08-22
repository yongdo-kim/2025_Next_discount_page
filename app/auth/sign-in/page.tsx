import { Suspense } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import AnimatedCharacterImage from "./AnimatedCharacterImage";

export const metadata = {
  title: "로그인 - 할인탐정",
  description: "할인탐정에 로그인하여 맞춤형 할인 정보를 받아보세요.",
};

export default function SignInPage() {
  return (
    <div
      className="container mx-auto flex flex-col justify-between pt-64"
      data-testid="signin-page"
    >
      <div
        className="flex flex-1 items-center justify-center"
        data-testid="signin-content"
      >
        <div
          className="mx-auto flex w-full max-w-screen-lg flex-col items-center rounded-lg p-8 shadow-md"
          data-testid="signin-container"
        >
          <AnimatedCharacterImage />
          <h1
            className="mb-2 text-2xl font-bold text-emerald-400"
            data-testid="signin-title"
          >
            할인탐정
          </h1>
          <div
            className="mb-6 text-center text-lg text-neutral-100"
            data-testid="signin-description"
          >
            할인은 우리가 수사합니다. <br />
            진짜 혜택만을 추적해 보여주는 스마트 쇼핑 도우미입니다
          </div>
          <Suspense
            fallback={
              <div
                className="mb-2 h-14 w-60 animate-pulse rounded bg-gray-200"
                data-testid="signin-loading"
              ></div>
            }
          >
            <GoogleLoginButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
