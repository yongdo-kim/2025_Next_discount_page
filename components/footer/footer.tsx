"use client";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto w-full max-w-screen-lg border-neutral-600 pt-4">
      <div className="flex flex-col items-end px-8">
        <div>
          <h4 className="mb-4 font-semibold">고객 지원</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link
                href={ROUTES.CONTACT}
                className="transition-colors hover:text-white"
              >
                문의하기
              </Link>
            </li>
          </ul>
        </div>

        {/* 저작권 정보 */}
        <div className="w-full pt-12 pb-8 text-center text-sm text-neutral-300">
          <p> {currentYear} 할인탐정. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
