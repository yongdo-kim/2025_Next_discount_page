"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-screen-lg">
      <div className="flex flex-col items-end px-8">
        <div className="grid grid-cols-1 justify-end gap-8 md:grid-cols-2">
          {/* 서비스 안내 */}

          {/* 고객 지원 */}
          <div>
            <h4 className="mb-4 font-semibold">고객 지원</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 정보 */}
        <div className="pt-12 pb-8 text-center text-sm text-neutral-300">
          <p> {currentYear} 할인탐정. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
