import { Gift } from "lucide-react";

interface GiftIconProps {
  className?: string;
}

export function GiftIcon({ className = "h-6 w-6" }: GiftIconProps) {
  return (
    <>
      <svg width="0" height="0">
        <defs>
          <linearGradient
            id="gift-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>
      <Gift
        className={className}
        style={{
          stroke: "url(#gift-gradient)",
          strokeWidth: 1.5,
          fill: "url(#gift-gradient)",
        }}
      />
    </>
  );
}
