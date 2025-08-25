"use client";

import { Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SparklingStarIconProps {
  className?: string;
}

export default function SparklingStarIcon({
  className = "w-6 h-6",
}: SparklingStarIconProps) {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (starRef.current) {
      gsap.fromTo(
        starRef.current,
        { opacity: 0.6 },
        {
          opacity: 1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        },
      );
    }
  }, []);

  return (
    <div ref={starRef}>
      <Star className={`fill-yellow-400 text-yellow-400 ${className}`} />
    </div>
  );
}
