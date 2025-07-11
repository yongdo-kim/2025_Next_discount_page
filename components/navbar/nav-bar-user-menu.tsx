"use client";

import { Button } from "@/components/ui/button";
import LogoutButton from "@/features/auth/presentation/logout-button";
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
    <div className="flex items-center space-x-2">
      {currentUser ? (
        <div className="flex items-center space-x-2">
          <Link href={ROUTES.MY_PAGE}>
            <span className="text-sm font-bold">
              {currentUser?.nickname || currentUser?.name}
            </span>
            <span className="text-sm">님</span>
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <Button
          variant="outline"
          className="cursor-pointer text-xs sm:text-base"
          asChild
        >
          <Link href={ROUTES.SIGN_IN}>로그인</Link>
        </Button>
      )}
    </div>
  );
}
