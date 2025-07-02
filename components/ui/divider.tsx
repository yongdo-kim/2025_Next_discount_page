interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => {
  return <div className={`mx-4 h-px bg-neutral-700 ${className ?? ""}`}></div>;
};
