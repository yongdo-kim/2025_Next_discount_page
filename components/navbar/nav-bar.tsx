"use client";
import ThemeToggleButton from "../theme-toggle-button";

interface NavBarProps {
  className?: string;
}

export default function NavBar({ className = "" }: NavBarProps) {
  return (
    <nav className={className}>
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between bg-white dark:bg-neutral-900">
        <span
          onClick={() => (window.location.href = "/")}
          className="font-bold text-lg cursor-pointer"
        >
          로고
        </span>
        <ThemeToggleButton />
      </div>
    </nav>
  );
}
