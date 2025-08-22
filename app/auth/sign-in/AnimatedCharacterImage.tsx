"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedCharacterImage() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(imageRef.current, {
        scaleX: 1.02,
        duration: 0.2,
        ease: "power2.inOut",
      })
        .to(imageRef.current, {
          scaleX: 1.02,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(imageRef.current, {
          scaleY: 1.02,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(imageRef.current, {
          scaleY: 1.02,
          duration: 0.2,
          ease: "power2.inOut",
        });
    }
  }, []);

  return (
    <Image
      ref={imageRef}
      src="/discount-character-1024.webp"
      alt="할인탐정 캐릭터"
      width={160}
      height={160}
      priority
      data-testid="signin-character-image"
    />
  );
}
