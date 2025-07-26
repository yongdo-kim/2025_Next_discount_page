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
      className="mr-2 flex items-center md:hidden"
      aria-label="뒤로가기"
    >
      <MdArrowBack size={28} />
    </button>
  );
}