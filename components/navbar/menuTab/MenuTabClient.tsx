"use client";
import { Badge } from "@/components/shadcn/badge";
import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
import { useFetchCategories } from "@/features/categories/presentation/hooks/use-fetch-categories";
import { getCategoryColors } from "@/lib/category-colors";
import { sendGAEvent } from "@/lib/ga";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type MenuItemProps = {
  category: CategoryEntity;
  selected: boolean;
  onClick: () => void;
  className?: string;
};

function MenuItem({ category, selected, onClick, className }: MenuItemProps) {
  const categoryColors = getCategoryColors(category.name);

  return (
    <Badge
      variant={selected ? "default" : "outline"}
      className={cn(
        "rounded-full text-sm font-medium transition-colors",
        selected
          ? categoryColors?.selected ||
              "border border-emerald-400 bg-transparent text-emerald-400"
          : categoryColors?.bg ||
              "border-gray-300 bg-transparent text-gray-300",
        categoryColors?.hover || "hover:text-emerald-400",
        className,
      )}
      onClick={onClick}
    >
      {category.name}
    </Badge>
  );
}

const SHOW_ALL_CATEGORY = new CategoryEntity({ id: 0, name: "전체보기" });

const ALLOWED_TITLES = [
  "이벤트",
  "게임",
  "쿠팡",
  "카카오",
  "지마켓",
  "옥션",
  "오늘의집",
  "롯데온",
  "네이버",
  "11번가",
  "토스",
  "톡딜",
];

export default function MenuTabClient() {
  const { data: categories = [] } = useFetchCategories();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("category");

  const sorted = useMemo(() => {
    if (!categories || categories.length === 0) return [];

    const matchingCategories = categories.filter((c) =>
      ALLOWED_TITLES.includes(c.name),
    );

    const hasOtherCategories = categories.some(
      (c) => !ALLOWED_TITLES.includes(c.name) && c.name !== "기타",
    );

    const etcCategory = hasOtherCategories
      ? new CategoryEntity({ id: -1, name: "기타" })
      : null;

    return etcCategory
      ? [SHOW_ALL_CATEGORY, ...matchingCategories, etcCategory]
      : [SHOW_ALL_CATEGORY, ...matchingCategories];
  }, [categories]); // categories가 변경될 때만 재계산

  const selectedCategoryId = Number(selectedId) || 0;

  // 카테고리 클릭 핸들러 생성
  const createHandleCategoryClick = (id: number) => () => {
    // 카테고리 클릭 시 구글 애널리틱스 이벤트 전송
    sendGAEvent("category_click", {
      category_id: id,
      category_name: categories?.find((c) => c.id === id)?.name ?? "전체",
    });

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
      <div className="hidden md:flex">
        <aside className="container mx-auto flex flex-wrap px-4 py-4">
          {sorted.map((category) => (
            <MenuItem
              key={category.id}
              category={category}
              selected={selectedCategoryId === category.id}
              onClick={createHandleCategoryClick(category.id)}
              className="text-md hover:bg-accent cursor-pointer items-start rounded-sm border-0 p-3 font-bold hover:text-emerald-400"
            />
          ))}
        </aside>
      </div>
      {/* 모바일 */}
      <div className="block md:hidden">
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
