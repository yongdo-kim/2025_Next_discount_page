"use client";

import { gsap } from "gsap";
import { ShoppingBag } from "lucide-react";
import { useEffect, useRef } from "react";

type ShoppingBagIconProps = {
  className?: string;
};

export function ShoppingBagIcon({
  className = "h-5 w-5",
}: ShoppingBagIconProps) {
  const iconRef = useRef<SVGSVGElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);

  useEffect(() => {
    if (!iconRef.current || !gradientRef.current) return;

    const icon = iconRef.current;
    const gradient = gradientRef.current;
    const stops = gradient.querySelectorAll("stop");

    // 흔들림 애니메이션
    const shakeTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    shakeTl
      .to(icon, {
        rotation: 10,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(icon, {
        rotation: -10,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(icon, {
        rotation: 5,
        duration: 0.2,
        ease: "power2.inOut",
      })
      .to(icon, {
        rotation: -5,
        duration: 0.2,
        ease: "power2.inOut",
      });

    // 그라데이션 애니메이션 (FlameIcon 참고)
    stops.forEach((stop, i) => {
      gsap.set(stop, {
        attr: { offset: `${-50 + i * 50}%` },
      });
    });

    const gradientTl = gsap.timeline({ repeat: -1, yoyo: true });
    stops.forEach((stop, i) => {
      gradientTl.to(
        stop,
        {
          attr: { offset: `${100 + i * 50}%` },
          duration: 2,
          ease: "power2.inOut",
        },
        0,
      );
    });

    return () => {
      shakeTl.kill();
      gradientTl.kill();
    };
  }, []);

  return (
    <>
      <svg width="0" height="0">
        <defs>
          <linearGradient
            ref={gradientRef}
            id="shopping-bag-gradient"
            x1="0%"
            y1="100%"
            x2="0%"
            y2="0%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="-50%" stopColor="#8b5cf6" />
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
            <stop offset="150%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <ShoppingBag
        ref={iconRef}
        className={className}
        style={{
          transformOrigin: "bottom",
          stroke: "url(#shopping-bag-gradient)",
          strokeWidth: 1.5,
        }}
      />
    </>
  );
}
