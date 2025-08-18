import { Flame } from "lucide-react";

interface FlameIconProps {
  className?: string;
}

export function FlameIcon({ className = "h-6 w-6" }: FlameIconProps) {
  return (
    <>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="flame-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>
      <Flame
        className={className}
        style={{
          stroke: "url(#flame-gradient)",
          strokeWidth: 1.5,
          fill: "url(#flame-gradient)",
        }}
      />
    </>
  );
}
