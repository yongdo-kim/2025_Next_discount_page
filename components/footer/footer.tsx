"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-neutral-200 dark:border-neutral-800">
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
              <li>
                <Link
                  href="/how-it-works"
                  className="transition-colors hover:text-white"
                >
                  이용 방법
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="transition-colors hover:text-white"
                >
                  카테고리
                </Link>
              </li>
              <li>
                <Link
                  href="/popular"
                  className="transition-colors hover:text-white"
                >
                  인기 할인
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
                  자주 묻는 질문
                </Link>
              </li>
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

          {/* 연락처 정보 */}
          <div>
            <h4 className="font-semibold">문의하기</h4>
            <address className="space-y-2 text-gray-400 not-italic">
              <p>이메일: naristudio2023@gmail.com</p>
            </address>
            <div className="mb-4 border-gray-800 pt-8 text-center text-sm text-gray-500">
              <p> {currentYear} 할인탐정. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* 저작권 정보 */}
      </div>
    </footer>
  );
}
