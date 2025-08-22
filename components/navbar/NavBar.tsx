import MobileBackButton from "@/components/navbar/MobileBackButton";
import NavBarUserMenu from "@/components/navbar/NavBarUserMenu";
import { UserDto } from "@/features/users/infrastructure/dto/user-res.dto";
import Link from "next/link";
type NavBarProps = {
  ssrUser: UserDto | null;
  className?: string;
};
export default function NavBar({ className = "", ssrUser }: NavBarProps) {
  return (
    <nav className={className} data-testid="navbar">
      <div
        className="container mx-auto flex items-center justify-between px-4 py-8 dark:bg-neutral-900"
        data-testid="navbar-container"
      >
        {/* 모바일 뒤로가기 아이콘 */}
        <MobileBackButton />
        <Link
          href="/"
          className="flex cursor-pointer text-lg font-bold"
          data-testid="navbar-logo-link"
        >
          <div
            className="ml-3 font-bold hover:text-emerald-400"
            data-testid="navbar-brand"
          >
            Bargain Hunter
          </div>
        </Link>
        <NavBarUserMenu ssrUser={ssrUser} />
      </div>
    </nav>
  );
}
