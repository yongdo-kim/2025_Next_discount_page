"use client";
import Image from "next/image";
import ThemeToggleButton from "../theme-toggle-button";
interface NavBarProps {
  className?: string;
}

export default function NavBar({ className = "" }: NavBarProps) {
  return (
    <nav className={className}>
      <div className="mx-auto flex max-w-screen-xl items-center justify-between bg-white px-4 py-6 lg:px-16 dark:bg-neutral-900">
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
          <div className="ml-3 font-bold ">할인탐정</div>
        </span>
        <div className="flex items-center space-x-2">
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
}
