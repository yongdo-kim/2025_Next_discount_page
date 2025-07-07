"use client";
import { useGoogleLogin } from "@/features/auth/presentation/hooks/useGoogleLogin";

export default function SignInPage() {
  const { googleLogin } = useGoogleLogin();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-xs flex-col items-center rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">구글 로그인</h1>
        <button
          onClick={() => googleLogin()}
          className="flex w-full items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_17_40)">
              <path
                d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24V29.1H37.6C36.9 32.3 34.7 34.7 31.8 36.2V42H39.4C44 38 47.5 31.9 47.5 24.5Z"
                fill="#4285F4"
              />
              <path
                d="M24 48C30.6 48 36.1 45.9 39.4 42L31.8 36.2C30.1 37.2 27.9 37.8 24 37.8C17.7 37.8 12.2 33.6 10.3 28.1H2.5V33.1C5.8 40.1 14.1 48 24 48Z"
                fill="#34A853"
              />
              <path
                d="M10.3 28.1C9.7 26.1 9.7 24 9.7 21.9C9.7 19.8 9.7 17.7 10.3 15.7V10.7H2.5C0.9 13.8 0 17.3 0 21.9C0 26.5 0.9 30 2.5 33.1L10.3 28.1Z"
                fill="#FBBC05"
              />
              <path
                d="M24 9.2C27.4 9.2 30.1 10.4 31.8 11.6L39.4 5.8C36.1 2.1 30.6 0 24 0C14.1 0 5.8 7.9 2.5 15.9L10.3 21.9C12.2 16.4 17.7 9.2 24 9.2Z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
          구글 계정으로 로그인
        </button>
      </div>
    </div>
  );
}
