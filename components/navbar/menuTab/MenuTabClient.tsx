"use client";
import { Badge } from "@/components/ui/badge";
import { CategoryEntity } from "@/features/categories/domain/entities/category.entity";
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

const SHOW_ALL_CATEGORY = new CategoryEntity({ id: 0, name: "전체보기" });

type MenuTabClientProps = {
  categories: CategoryEntity[];
};

export default function MenuTabClient({ categories }: MenuTabClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("category");

  const sorted = useMemo(() => {
    if (!categories) return [];

    const etcCategory = categories.find((c) => c.name === "기타");
    const rest = categories.filter((c) => c.name !== "기타");
    const sortedRest = [...rest].sort((a, b) =>
      a.name.localeCompare(b.name, "ko"),
    );

    return etcCategory
      ? [SHOW_ALL_CATEGORY, ...sortedRest, etcCategory]
      : [SHOW_ALL_CATEGORY, ...sortedRest];
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
