"use client";
import { Button } from "@/components/shadcn/button";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <NotFoundCharatcer />
      <div className="w-1/2 rounded-lg p-6 text-center shadow-md">
        <h1 className="mb-4 text-5xl font-bold">404 Not Found</h1>
        <p className="text-4xl">요청하신 페이지를 찾을 수 없어요.</p>
        <Button
          variant="outline"
          className="m-8 cursor-pointer p-6 text-2xl"
          onClick={() => (window.location.href = "/")}
        >
          돌아가기
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

const NotFoundCharatcer = () => {
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (characterRef.current) {
      gsap.to(characterRef.current, {
        opacity: 0.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, []);

  return (
    <>
      <div ref={characterRef} className="relative flex flex-col items-center">
        <div className="relative mb-4">
          <div className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-lg">
            원하는 자료를 못 찾았어요 ㅠㅠ
          </div>
          <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-t-white border-r-transparent border-l-transparent"></div>
        </div>
        <Image
          src="/discount-character-1024.webp"
          alt="할인탐정 캐릭터"
          width={160}
          height={160}
          priority
          data-testid="signin-character-image"
        />
      </div>
    </>
  );
};
