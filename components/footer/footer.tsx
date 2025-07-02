"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 py-2 dark:border-neutral-800">
      <div className="container mx-auto px-8 pt-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 서비스 안내 */}
          <div>
            <h4 className="mb-4 font-semibold">서비스</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  서비스 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div>
            <h4 className="mb-4 font-semibold">고객 지원</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-white"
                >
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 정보 */}
        <div className="pt-8 pb-8 text-center text-sm text-neutral-300">
          <p> {currentYear} 할인탐정. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
