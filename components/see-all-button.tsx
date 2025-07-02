import Link from "next/link";
import { Button } from "./ui/button";

export default function SeeAllButton({ href }: { href: string }) {
  return (
    <Button asChild variant="outline" className="m-0 cursor-pointer text-lg">
      <Link href={href}>전체보기</Link>
    </Button>
  );
}
