"use client";

import LogoutButton from "@/features/auth/presentation/LogoutButton";
import { UserDto } from "@/features/users/infrastructure/dto/user-res.dto";
import { useMe } from "@/features/users/presentation/hooks/useMe";
import { ROUTES } from "@/lib/routes";
import { gsap } from "gsap";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function NavBarUserMenu({
  ssrUser,
}: {
  ssrUser: UserDto | null;
}) {
  const { data: user } = useMe(!!ssrUser);
  const currentUser = user ?? ssrUser;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        backgroundColor: "#34d399",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
        <button
          ref={buttonRef}
          className="cursor-pointer rounded-full border-1 px-4 py-2"
        >
          <Link href={ROUTES.SIGN_IN} className="flex items-center gap-2">
            <LogIn size={16} />
            로그인
          </Link>
        </button>
      )}
    </div>
  );
}
