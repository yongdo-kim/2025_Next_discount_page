import React from "react";

export const Column = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>) => {
  //children의 컨텐츠 만큼 차지하려면 inline-flex

  return (
    <div className={`flex flex-col ${className}`} {...rest}>
      {children}
    </div>
  );
};
