"use client";
import { CategoryEntity } from "@/features/category/domain/entities/category.entity";
import { useFetchCategories } from "@/features/category/presentation/hooks/use-fetch-categories";
import { cn } from "@/lib/utils"; // 실제 경로에 맞게 import
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";

type MenuItemProps = {
  category: CategoryEntity;
  selected: boolean;
  onClick: () => void;
  className?: string;
};

function MenuItem({ category, selected, onClick, className }: MenuItemProps) {
  return (
    <Badge
      variant={selected ? "default" : "outline"}
      className={cn(
        "rounded-full font-medium",
        selected && "border border-emerald-400 bg-transparent text-emerald-400",
        className,
      )}
      onClick={onClick}
    >
      {category.name}
    </Badge>
  );
}

export default function MenuTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("category");

  const { data: categories } = useFetchCategories();
  const seeAllCategory = new CategoryEntity({
    id: 0,
    name: "전체보기",
  });
  const sorted = categories
    ? [
        seeAllCategory,
        ...[...categories].sort((a, b) => a.name.localeCompare(b.name, "ko")),
      ]
    : [];

  const selectedCategoryId = Number(selectedId);

  // 카테고리 클릭 핸들러 생성
  const createHandleCategoryClick = (id: number) => () => {
    if (id === 0) {
      router.replace(`/`);
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("category", id.toString());
    router.replace(`?${params.toString()}`);
  };

  return (
    <>
      {/* 데스크탑 */}
      <div className="hidden lg:flex">
        <aside className="mx-auto flex w-[200px] flex-col items-center space-y-6 px-4 py-4">
          {sorted.map((category) => (
            <MenuItem
              key={category.id}
              category={category}
              selected={selectedCategoryId === category.id}
              onClick={createHandleCategoryClick(category.id)}
              className="text-md hover:bg-accent w-[150px] cursor-pointer items-start rounded-sm border-0 p-3 font-bold"
            />
          ))}
        </aside>
      </div>
      {/* 모바일 */}
      <div className="block lg:hidden">
        <div className="flex flex-wrap gap-3 px-4 pt-4 pb-4">
          {sorted.map((category) => (
            <MenuItem
              key={category.id}
              category={category}
              selected={selectedCategoryId === category.id}
              onClick={createHandleCategoryClick(category.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
