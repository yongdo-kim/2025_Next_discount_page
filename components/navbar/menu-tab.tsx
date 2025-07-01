"use client";
import { CategoryEntity } from "@/features/category/domain/entities/category.entity";
import { useFetchCategories } from "@/features/category/presentation/hooks/use-fetch-categories";

export default function MenuTab() {
  const { data: categories } = useFetchCategories();

  // name 가나다순 정렬
  const sorted = categories
    ? [...categories].sort((a, b) => a.name.localeCompare(b.name, "ko"))
    : [];

  return (
    <div className="flex w-[200px] flex-col items-center space-y-4 px-4 pt-4">
      <MenuAll />
      {sorted.map((category) => (
        <MenuItem key={category.id} category={category} />
      ))}
    </div>
  );
}

import Link from "next/link";

const MenuAll = () => (
  <Link
    href="/"
    className="block w-full cursor-pointer p-2 text-xl font-bold hover:rounded-xl hover:bg-neutral-700"
  >
    전체보기
  </Link>
);

const MenuItem = ({ category }: { category: CategoryEntity }) => {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="block w-full cursor-pointer p-2 text-xl font-bold hover:rounded-xl hover:bg-neutral-700"
    >
      {category.name}
    </Link>
  );
};
