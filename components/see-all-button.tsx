import Link from "next/link";
import { Button } from "./ui/button";

interface SeeAllButtonProps {
  href: string;
  className?: string;
}

export default function SeeAllButton({ href, className }: SeeAllButtonProps) {
  return (
    <Button
      asChild
      variant="outline"
      className={`m-0 cursor-pointer text-lg ${className ?? ""}`}
    >
      <Link href={href}>전체보기</Link>
    </Button>
  );
}
