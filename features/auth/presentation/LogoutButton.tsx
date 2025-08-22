"use client";

import { useLogout } from "@/features/auth/presentation/hooks/useLogout";
import { useGsapFillHover } from "@/lib/hooks/use-gsap-fill-hover";

export default function LogoutButton() {
  const { mutate: logout, isPending } = useLogout();
  const fillRef = useGsapFillHover<HTMLButtonElement>();

  return (
    <button
      ref={fillRef}
      className="flex w-[90px] cursor-pointer items-center justify-center rounded-full border px-4 py-2 text-sm"
      onClick={() => logout()}
      disabled={isPending}
      data-testid="navbar-logout-button"
    >
      {isPending ? (
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current"></div>
          <span>로그아웃 중...</span>
        </div>
      ) : (
        "로그아웃"
      )}
    </button>
  );
}
