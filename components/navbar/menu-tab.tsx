"use client";
import { CategoryEntity } from "@/features/category/domain/entities/category.entity";
import { useFetchCategories } from "@/features/category/presentation/hooks/use-fetch-categories";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function MenuTab() {
  const { data: categories } = useFetchCategories();

  // name 가나다순 정렬
  const sorted = categories
    ? [...categories].sort((a, b) => a.name.localeCompare(b.name, "ko"))
    : [];

  return (
    <>
      {/* 데스크탑: 사이드바 */}
      <div className="hidden lg:block">
        <aside className="flex w-[200px] flex-col items-center space-y-4 px-4 pt-4">
          <MenuAllDesktop />
          {sorted.map((category) => (
            <MenuItemDesktop key={category.id} category={category} />
          ))}
        </aside>
      </div>

      {/* 모바일: 태그리스트 */}
      <div className="block lg:hidden">
        <div className="flex flex-wrap gap-3 px-4 pt-4 pb-4">
          <MenuAllMobile />
          {sorted.map((category) => (
            <MenuItemMobile key={category.id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}

const MenuAllDesktop = () => (
  <Link
    href="/"
    className="block w-full cursor-pointer p-2 text-xl font-bold hover:rounded-xl hover:bg-neutral-700"
  >
    전체보기
  </Link>
);

const MenuItemDesktop = ({ category }: { category: CategoryEntity }) => {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="block w-full cursor-pointer p-2 text-xl font-bold hover:rounded-xl hover:bg-neutral-700"
    >
      {category.name}
    </Link>
  );
};

const MenuAllMobile = () => (
  <Link href="/" className="cursor-pointer">
    <Badge variant="outline" className="text-sm">
      전체보기
    </Badge>
  </Link>
);

const MenuItemMobile = ({ category }: { category: CategoryEntity }) => {
  return (
    <Link href={`/categories/${category.id}`} className="cursor-pointer">
      <Badge variant="outline" className="text-sm">
        {category.name}
      </Badge>
    </Link>
  );
};
