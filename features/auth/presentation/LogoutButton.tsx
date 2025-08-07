"use client";

import { Button } from "@/components/shadcn/button";
import { useLogout } from "@/features/auth/presentation/hooks/useLogout";

export default function LogoutButton() {
  const { mutate: logout, isPending } = useLogout();

  return (
    <Button
      variant="outline"
      className="flex cursor-pointer items-center"
      onClick={() => logout()}
      disabled={isPending}
    >
      {isPending ? "로그아웃 중..." : "로그아웃"}
    </Button>
  );
}
