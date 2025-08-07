import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
};

export const Divider = ({ className }: DividerProps) => {
  return <div className={cn("mx-4 h-px bg-neutral-700", className)}></div>;
};
