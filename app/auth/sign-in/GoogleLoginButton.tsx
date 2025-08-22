"use client";
import { useGoogleLogin } from "@/features/auth/presentation/hooks/useGoogleLogin";
import { useGsapHover } from "@/lib/hooks/use-gsap-hover";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const { googleLogin } = useGoogleLogin();
  const buttonRef = useGsapHover<HTMLButtonElement>();

  return (
    <button
      ref={buttonRef}
      onClick={() => googleLogin()}
      className="mb-2 flex cursor-pointer items-center gap-2 rounded-full border border-emerald-400 px-4 py-2 text-lg font-semibold"
      type="button"
      data-testid="google-login-button"
    >
      <FcGoogle size={24} data-testid="google-icon" />
      <div>구글 계정으로 로그인</div>
    </button>
  );
}
