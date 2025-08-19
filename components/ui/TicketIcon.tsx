import { Ticket } from "lucide-react";

interface TicketIconProps {
  className?: string;
}

export function TicketIcon({ className = "h-6 w-6" }: TicketIconProps) {
  return (
    <>
      <svg width="0" height="0">
        <defs>
          <linearGradient
            id="ticket-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      <Ticket
        className={className}
        style={{
          stroke: "url(#ticket-gradient)",
          strokeWidth: 1.5,
          fill: "url(#ticket-gradient)",
        }}
      />
    </>
  );
}
