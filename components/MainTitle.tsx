import { cn } from "@/lib/utils";

export default function MainTitle({
  title,

  className,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center pb-2 text-xl font-bold", className)}>
      <div className="mr-2">{icon}</div>
      <div>{title}</div>
    </div>
  );
}
