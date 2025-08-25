"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const AnimatedGradientCircles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const gradientDivs =
      containerRef.current.querySelectorAll(".gradient-circle");

    gradientDivs.forEach((div) => {
      const element = div as HTMLElement;

      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          opacity: 0.95,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          opacity: 0.5,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10">
      <div className="gradient-circle absolute top-0 left-0 h-14 w-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-50 sm:h-18 sm:w-18 md:h-22 md:w-22 lg:h-32 lg:w-32"></div>
      <div className="gradient-circle absolute top-2 right-4 h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-50 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-22 lg:w-22"></div>
      <div className="gradient-circle absolute bottom-2 left-24 h-13 w-13 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-50 sm:h-17 sm:w-17 md:h-20 md:w-20 lg:h-24 lg:w-24"></div>
      <div className="gradient-circle absolute right-32 bottom-2 h-11 w-11 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 opacity-50 sm:h-15 sm:w-15 md:h-16 md:w-16 lg:h-20 lg:w-20"></div>
    </div>
  );
};
