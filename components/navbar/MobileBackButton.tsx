"use client";

import { usePathname } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default function MobileBackButton() {
  const pathname = usePathname();
  const showBack = pathname !== "/";

  if (!showBack) return null;

  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="mr-2 flex cursor-pointer items-center hover:bg-emerald-400 hover:text-emerald-400 md:hidden"
      aria-label="뒤로가기"
      data-testid="navbar-mobile-back-button"
    >
      <MdArrowBack size={28} />
    </button>
  );
}
