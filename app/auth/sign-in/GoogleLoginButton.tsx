"use client";
import { Button } from "@/components/shadcn/button";
import { useGoogleLogin } from "@/features/auth/presentation/hooks/useGoogleLogin";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const { googleLogin } = useGoogleLogin();

  return (
    <Button
      onClick={() => googleLogin()}
      className="mb-2 w-60 cursor-pointer p-6 text-xl font-semibold"
      variant="outline"
      type="button"
    >
      <FcGoogle size={24} />
      구글 계정으로 로그인
    </Button>
  );
}