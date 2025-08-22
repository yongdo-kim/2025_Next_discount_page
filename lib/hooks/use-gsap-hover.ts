import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface UseGsapHoverOptions {
  hoverColor?: string;
  defaultColor?: string;
  duration?: number;
  ease?: string;
}

export function useGsapHover<T extends HTMLElement>(
  options: UseGsapHoverOptions = {},
) {
  const {
    hoverColor = "#34d399",
    defaultColor = "transparent",
    duration = 0.3,
    ease = "power2.out",
  } = options;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        backgroundColor: hoverColor,
        duration,
        ease,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        backgroundColor: defaultColor,
        duration,
        ease,
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hoverColor, defaultColor, duration, ease]);

  return elementRef;
}
