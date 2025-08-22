"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AnimatedCharacterImage() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(imageRef.current, {
        scaleX: 1.2,
        duration: 0.5,
        ease: "power2.inOut",
      })
        .to(imageRef.current, {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(imageRef.current, {
          scaleY: 1.1,
          duration: 0.5,
          ease: "power2.inOut",
        })
        .to(imageRef.current, {
          scaleY: 1,
          duration: 0.5,
          ease: "power2.inOut",
        });
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative mb-4">
        <div className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-lg">
          로그인 해볼까요?
        </div>
        <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-t-white border-r-transparent border-l-transparent"></div>
      </div>
      <Image
        ref={imageRef}
        src="/discount-character-1024.webp"
        alt="할인탐정 캐릭터"
        width={160}
        height={160}
        priority
        data-testid="signin-character-image"
      />
    </div>
  );
}
