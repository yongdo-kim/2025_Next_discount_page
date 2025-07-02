import React from "react";
export const Row = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`flex flex-row ${className} `} {...rest}>
      {children}
    </div>
  );
};
