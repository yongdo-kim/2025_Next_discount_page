"use client";
import { useDevLogin } from "@/features/auth/presentation/hooks/useDevLogin";
import { useGsapFillHover } from "@/lib/hooks/use-gsap-fill-hover";
import { FcGoogle } from "react-icons/fc";

export default function DevLoginButton() {
  const { mutate } = useDevLogin();
  const fillRef = useGsapFillHover<HTMLButtonElement>();

  return (
    <button
      ref={fillRef}
      onClick={() => mutate()}
      className="mb-2 flex cursor-pointer items-center gap-2 rounded-full border border-emerald-400 px-4 py-2 text-lg font-semibold"
      type="button"
      data-testid="dev-login-button"
    >
      <FcGoogle size={24} data-testid="dev-icon" />
      <div>개발자 계정으로 로그인</div>
    </button>
  );
}
