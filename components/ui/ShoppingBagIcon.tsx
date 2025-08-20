"use client";

import { gsap } from "gsap";
import { ShoppingBag } from "lucide-react";
import { useEffect, useRef } from "react";

interface ShoppingBagIconProps {
  className?: string;
}

export function ShoppingBagIcon({
  className = "h-5 w-5",
}: ShoppingBagIconProps) {
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;

    const icon = iconRef.current;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // 쇼핑백이 살짝 흔들리는 애니메이션
    tl.to(icon, {
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

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <ShoppingBag
      ref={iconRef}
      className={className}
      style={{
        transformOrigin: "bottom",
      }}
    />
  );
}
