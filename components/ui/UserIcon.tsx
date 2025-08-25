"use client";

import { useEffect, useRef } from "react";
import { User } from "lucide-react";
import { gsap } from "gsap";

type UserIconProps = {
  className?: string;
};

export function UserIcon({ className = "h-6 w-6" }: UserIconProps) {
  const gradientRef = useRef<SVGLinearGradientElement>(null);

  useEffect(() => {
    if (!gradientRef.current) return;

    const gradient = gradientRef.current;
    const stops = gradient.querySelectorAll("stop");

    // 초기 위치 설정
    stops.forEach((stop, i) => {
      gsap.set(stop, {
        attr: { offset: `${-50 + i * 50}%` },
      });
    });

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // 연속적인 파도 효과: 모든 stop들이 함께 위로 이동
    stops.forEach((stop, i) => {
      tl.to(
        stop,
        {
          attr: { offset: `${100 + i * 50}%` },
          duration: 2.5,
          ease: "power2.inOut",
        },
        0,
      );
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
            id="user-gradient"
            x1="0%"
            y1="100%"
            x2="0%"
            y2="0%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="-50%" stopColor="#3b82f6" />
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
            <stop offset="150%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <User
        className={className}
        style={{
          stroke: "url(#user-gradient)",
          strokeWidth: 1.5,
          fill: "url(#user-gradient)",
        }}
      />
    </>
  );
}
