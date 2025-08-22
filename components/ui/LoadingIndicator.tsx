"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

type LoadingIndicatorProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  showCharacter?: boolean;
  characterSize?: number;
};

export default function LoadingIndicator({
  title = "로딩 중이에요!",
  subtitle = "잠시만 기다려주세요",
  description = "할인은 우리가 수사합니다. \n진짜 혜택만을 추적해 보여주는 스마트 쇼핑 도우미입니다",
  showCharacter = true,
  characterSize = 160,
}: LoadingIndicatorProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current && showCharacter) {
      gsap.to(imageRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "none",
      });
    }
  }, [showCharacter]);

  return (
    <div className="container mx-auto flex h-full flex-col justify-between pt-64">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-screen-lg flex-col items-center rounded-lg p-8 shadow-md">
          <h1 className="mb-2 text-2xl font-bold text-emerald-400">{title}</h1>
          <h1 className="mb-2 text-2xl font-bold text-emerald-400">
            {subtitle}
          </h1>
          {showCharacter && (
            <Image
              ref={imageRef}
              src="/discount-character-1024.webp"
              alt="할인탐정 캐릭터"
              width={characterSize}
              height={characterSize}
              sizes={`${characterSize}px`}
              priority
            />
          )}
          <h1 className="mb-2 text-2xl font-bold text-emerald-400">할인탐정</h1>
          <div className="mb-6 text-center text-lg text-neutral-100">
            {description.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < description.split("\n").length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
