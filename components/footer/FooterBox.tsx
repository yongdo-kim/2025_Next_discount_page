import DividerLine from "@/components/ui/DividerLine";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function FooterBox() {
  // 정적 연도로 CLS 방지
  const currentYear = 2025;

  return (
    <footer className="container mx-auto min-h-[200px] border-neutral-600 pt-4">
      <DividerLine />
      <div className="flex w-full flex-col items-end px-8 py-8">
        <div className="flex-1">
          <h4 className="mb-4 flex justify-end font-semibold">고객 지원</h4>
          <ul className="space-y-2">
            <li className="flex justify-end">
              <Link
                href={ROUTES.CONTACT}
                className="text-right transition-colors hover:text-white"
              >
                문의하기
              </Link>
            </li>
            <li className="flex justify-end">
              이메일문의 : naristudio2023@gmail.com
            </li>
          </ul>
        </div>

        {/* 저작권 정보 - 고정 높이로 CLS 방지 */}
        <div className="flex h-[60px] w-full items-center justify-end pt-12 pb-8 text-right text-sm text-neutral-300">
          <p>{currentYear} 할인탐정. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
