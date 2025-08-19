import { Ticket } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TicketIconProps {
  className?: string;
}

export function TicketIcon({ className = "h-6 w-6" }: TicketIconProps) {
  const gradientRef = useRef<SVGLinearGradientElement>(null);

  useEffect(() => {
    if (!gradientRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(gradientRef.current, {
      attr: { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
      duration: 1,
      ease: "power2.inOut",
    })
      .to(gradientRef.current, {
        attr: { x1: "100%", y1: "100%", x2: "100%", y2: "100%" },
        duration: 1,
        ease: "power2.inOut",
      })
      .to(gradientRef.current, {
        attr: { x1: "100%", y1: "100%", x2: "0%", y2: "0%" },
        duration: 1,
        ease: "power2.inOut",
      })
      .to(gradientRef.current, {
        attr: { x1: "0%", y1: "0%", x2: "0%", y2: "0%" },
        duration: 1,
        ease: "power2.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <svg width="0" height="0">
        <defs>
          <linearGradient
            ref={gradientRef}
            id="ticket-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
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
