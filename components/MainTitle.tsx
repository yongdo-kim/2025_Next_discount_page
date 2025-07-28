import { CategoryIcon } from "@/components/CategoryIcon";
import { cn } from "@/lib/utils";

export default function MainTitle({
  title,
  coloredTitle,
  color,
  className,
  showIcon,
}: {
  title: string;
  coloredTitle: string;
  color?: string;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <div
      className={cn("flex items-center pb-2 text-xl font-bold md:text-2xl lg:text-3xl", className)}
    >
      {/* 아이콘 (showIcon이 true일 때만) */}
      {showIcon && (
        <span className="mr-2 flex items-center">
          {CategoryIcon(title, { size: 24 })}
        </span>
      )}
      <div>{title}</div>
      <div className={cn("px-2", color)}> {coloredTitle}</div>
    </div>
  );
}
