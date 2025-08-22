import { ClockAlert } from "lucide-react";

type GiftIconProps = {
  className?: string;
};

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
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
      <ClockAlert
        className={className}
        style={{
          stroke: "url(#gift-gradient)",
          strokeWidth: 2,
          fill: "none",
        }}
      />
    </>
  );
}
