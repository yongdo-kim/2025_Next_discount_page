"use client";
import Image from "next/image";
import { MdArrowBack } from "react-icons/md";
interface NavBarProps {
  className?: string;
}

import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useUserStore } from "@/features/users/presentation/store/user.store";

export default function NavBar({ className = "" }: NavBarProps) {
  const [showBack, setShowBack] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    // 클라이언트에서만 실행
    if (typeof window !== "undefined") {
      const isRoot = window.location.pathname === "/";
      // history.length는 1이면 새 탭 첫 페이지, 2 이상이면 뒤로가기 가능
      setShowBack(window.history.length > 1 && !isRoot);
    }
  }, []);

  return (
    <nav className={className}>
      <div className="mx-auto flex max-w-screen-xl items-center justify-between bg-white px-4 py-6 lg:px-16 dark:bg-neutral-900">
        {/* 모바일 뒤로가기 아이콘 */}
        {showBack && (
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mr-2 flex items-center md:hidden"
            aria-label="뒤로가기"
          >
            <MdArrowBack size={28} />
          </button>
        )}
        <span
          onClick={() => (window.location.href = "/")}
          className="flex cursor-pointer text-lg font-bold"
        >
          <Image
            src="/logo.png" // public 폴더에 있는 로고 이미지
            alt="로고"
            width={32}
            height={32}
            className="rounded-full border border-amber-200 bg-amber-100 p-1"
          />
          <div className="ml-3 font-bold">할인탐정</div>
        </span>
        <div className="flex items-center space-x-2">
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-amber-700 dark:text-amber-300">
                {user.nickname || user.name}
              </span>
              {/* 로그아웃/프로필 등 추가 가능 */}
            </div>
          ) : (
            <Button variant="outline" className="cursor-pointer" asChild>
              <Link href={ROUTES.SIGN_IN}>로그인</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
