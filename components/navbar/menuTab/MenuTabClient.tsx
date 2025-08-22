"use client";
import { Badge } from "@/components/shadcn/badge";
import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
import { useFetchCategories } from "@/features/categories/presentation/hooks/use-fetch-categories";
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
  const categoryColors =
    CATEGORY_COLORS[category.name as keyof typeof CATEGORY_COLORS];

  return (
    <Badge
      variant={selected ? "default" : "outline"}
      className={cn(
        "rounded-full text-sm font-medium transition-colors",
        selected
          ? categoryColors?.selected ||
              "border border-emerald-400 bg-transparent text-emerald-400"
          : "border-gray-300 bg-transparent text-gray-300",
        categoryColors?.hover || "hover:text-emerald-400",
        className,
      )}
      onClick={onClick}
    >
      {category.name}
    </Badge>
  );
}

const COLOR_THEMES = {
  yellow: {
    bg: "bg-yellow-50 text-yellow-700 border-yellow-200",
    hover:
      "hover:text-white hover:border-yellow-400 hover:bg-gradient-to-br from-yellow-400 to-yellow-500",
    selected:
      "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border-yellow-500",
  },
  red: {
    bg: "bg-red-50 text-red-700 border-red-200",
    hover:
      "hover:text-white hover:border-red-400 hover:bg-gradient-to-br from-red-400 to-red-500",
    selected:
      "bg-gradient-to-br from-red-500 to-red-700 text-white border-red-500",
  },
  green: {
    bg: "bg-green-50 text-green-700 border-green-200",
    hover:
      "hover:text-white hover:border-green-400 hover:bg-gradient-to-br from-green-400 to-green-500",
    selected:
      "bg-gradient-to-br from-green-500 to-green-700 text-white border-green-500",
  },
  sky: {
    bg: "bg-sky-50 text-sky-700 border-sky-200",
    hover:
      "hover:text-white hover:border-sky-400 hover:bg-gradient-to-br from-sky-400 to-sky-500",
    selected:
      "bg-gradient-to-br from-sky-400 to-sky-600 text-white border-sky-500",
  },
  emerald: {
    bg: "bg-gray-50 text-gray-700 border-gray-200",
    hover:
      "hover:text-white hover:border-emerald-400 hover:bg-gradient-to-br from-emerald-400 to-emerald-500",
    selected:
      "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white border-emerald-500",
  },
  pink: {
    bg: "bg-gray-50 text-gray-700 border-gray-200",
    hover:
      "hover:text-white hover:border-pink-400 hover:bg-gradient-to-br from-pink-500 to-red-500",
    selected:
      "bg-gradient-to-br from-pink-500 to-pink-600 text-white border-pink-500",
  },
};

const CATEGORY_COLORS = {
  카카오: COLOR_THEMES.yellow,
  쿠팡: COLOR_THEMES.red,
  옥션: COLOR_THEMES.red,
  전체보기: COLOR_THEMES.green,
  네이버: COLOR_THEMES.green,
  오늘의집: COLOR_THEMES.sky,
  G마켓: COLOR_THEMES.emerald,
  지마켓: COLOR_THEMES.emerald,
  "11번가": COLOR_THEMES.pink,
};

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
