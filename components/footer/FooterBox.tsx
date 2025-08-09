import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function FooterBox() {
  // 정적 연도로 CLS 방지
  const currentYear = 2025;

  return (
    <footer 
      className="mx-auto w-full max-w-screen-lg border-neutral-600 pt-4"
      style={{ 
        minHeight: '180px', 
        contain: 'layout style',
        willChange: 'auto'
      }}
    >
      <div className="flex flex-col items-end px-8 h-full">
        <div className="flex-1">
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

        {/* 저작권 정보 - 고정 높이로 CLS 방지 */}
        <div 
          className="w-full pt-12 pb-8 text-center text-sm text-neutral-300"
          style={{ 
            height: '60px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <p>{currentYear} 할인탐정. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
