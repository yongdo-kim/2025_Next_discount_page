import NavBarUserMenu from "@/components/navbar/nav-bar-user-menu";
import { UserDto } from "@/features/users/infrastructure/dto/user-res.dto";
import Image from "next/image";
import Link from "next/link";

type NavBarProps = {
  ssrUser: UserDto | null;
  className?: string;
};
export default function NavBar({ className = "", ssrUser }: NavBarProps) {
  return (
    <nav className={className}>
      <div className="container mx-auto flex items-center justify-between bg-white px-4 py-6 lg:px-16 dark:bg-neutral-900">
        {/* 모바일 뒤로가기 아이콘 */}
        {/* {showBack && (
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mr-2 flex items-center md:hidden"
            aria-label="뒤로가기"
          >
            <MdArrowBack size={28} />
          </button>
        )} */}
        <Link href="/" className="flex cursor-pointer text-lg font-bold">
          <Image
            src="/logo.png"
            alt="로고"
            width={32}
            height={32}
            className="rounded-full border border-amber-200 bg-amber-100 p-1"
          />
          <div className="ml-3 font-bold">할인탐정</div>
        </Link>
        <NavBarUserMenu ssrUser={ssrUser} />
      </div>
    </nav>
  );
}
