import React from "react";
import { cn } from "@/lib/utils";
export const Row = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-row", className)} {...rest}>
      {children}
    </div>
  );
};
