"use client";
import { CategoryEntity } from "@/features/category/domain/entities/category.entity";
import { useFetchCategories } from "@/features/category/presentation/hooks/use-fetch-categories";
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
      className={
        className ??
        "rounded-full text-sm font-medium" +
          (selected
            ? "border-3 border-emerald-400 bg-transparent text-emerald-400"
            : "")
      }
      onClick={onClick}
    >
      {category.name}
    </Badge>
  );
}

type MenuAllProps = {
  onClick: () => void;
  className?: string;
};

function MenuAll({ onClick, className }: MenuAllProps) {
  return (
    <Badge
      variant="outline"
      className={className ?? "text-sm"}
      onClick={onClick}
    >
      전체보기
    </Badge>
  );
}

export default function MenuTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("category");

  const { data: categories } = useFetchCategories();
  const sorted = categories
    ? [...categories].sort((a, b) => a.name.localeCompare(b.name, "ko"))
    : [];

  const selectedCategoryId = Number(selectedId);

  // 전체보기 클릭 시 쿼리스트링 제거
  const handleAllClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    router.replace(`?${params.toString()}`);
  };

  // 카테고리 클릭 핸들러 생성
  const createHandleCategoryClick = (id: number) => () => {
    const params = new URLSearchParams(searchParams);
    params.set("category", id.toString());
    router.replace(`?${params.toString()}`);
  };

  return (
    <>
      {/* 데스크탑 */}
      <div className="hidden lg:block">
        <aside className="flex w-[200px] flex-col items-center space-y-4 px-4 pt-4">
          <MenuAll
            onClick={handleAllClick}
            className="w-full p-2 text-xl font-bold hover:rounded-xl hover:bg-neutral-700"
          />
          {sorted.map((category) => (
            <MenuItem
              key={category.id}
              category={category}
              selected={selectedCategoryId === category.id}
              onClick={createHandleCategoryClick(category.id)}
              className="w-full text-sm"
            />
          ))}
        </aside>
      </div>
      {/* 모바일 */}
      <div className="block lg:hidden">
        <div className="flex flex-wrap gap-3 px-4 pt-4 pb-4">
          <MenuAll onClick={handleAllClick} />
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
