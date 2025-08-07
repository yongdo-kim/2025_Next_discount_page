import { cn } from "@/lib/utils";

type DividerLineProps = {
  className?: string;
};

export default function DividerLine({ className }: DividerLineProps) {
  return <div className={cn("mx-4 h-px bg-neutral-700", className)}></div>;
}
