"use client";

import { Button } from "@/components/shadcn/button";
import LogoutButton from "@/features/auth/presentation/LogoutButton";
import { UserDto } from "@/features/users/infrastructure/dto/user-res.dto";
import { useMe } from "@/features/users/presentation/hooks/useMe";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function NavBarUserMenu({
  ssrUser,
}: {
  ssrUser: UserDto | null;
}) {
  const { data: user } = useMe(!!ssrUser);
  const currentUser = user ?? ssrUser;

  return (
    <div className="flex items-center space-x-2" data-testid="navbar-user-menu">
      {currentUser ? (
        <div
          className="flex items-center space-x-2"
          data-testid="navbar-user-info"
        >
          <Link href={ROUTES.MY_PAGE} data-testid="navbar-user-profile-link">
            <span
              className="text-sm font-bold"
              data-testid="navbar-user-nickname"
            >
              {currentUser?.nickname || currentUser?.name}
            </span>
            <span className="text-sm" data-testid="navbar-user-suffix">
              님
            </span>
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <Button
          variant="outline"
          className="cursor-pointer text-xs sm:text-base"
          asChild
          data-testid="navbar-login-button"
        >
          <Link href={ROUTES.SIGN_IN}>로그인</Link>
        </Button>
      )}
    </div>
  );
}
