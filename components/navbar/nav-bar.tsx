"use client";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import ThemeToggleButton from "../theme-toggle-button";
import { Input } from "../ui/input";
interface NavBarProps {
  className?: string;
}

export default function NavBar({ className = "" }: NavBarProps) {
  return (
    <nav className={className}>
      <div className="mx-auto flex max-w-screen-xl items-center justify-between bg-white px-4 py-3 dark:bg-neutral-900">
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
          <div className="ml-2">할인탐정</div>
        </span>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <FiSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="할인 검색"
              className="w-full pl-9 focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2"
            />
          </div>
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
