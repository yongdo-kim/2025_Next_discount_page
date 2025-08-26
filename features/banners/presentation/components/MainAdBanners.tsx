import Image from "next/image";
import { AnimatedGradientCircles } from "./AnimatedGradientCircles";

export const MainAdBanners = () => {
  return (
    <div className="relative container mx-auto my-6 flex h-[120px] w-full items-center justify-center overflow-hidden rounded-lg border border-gray-600 px-6 py-4 md:h-[200px]">
      {/* 배경 원형 요소들 */}
      <AnimatedGradientCircles />

      <div className="relative z-1 flex items-center justify-center space-x-4">
        <h1 className="text-sm font-bold text-white lg:text-xl">
          할인탐정에 어서오세요
        </h1>
        <Image
          src="/discount-character-1024.webp"
          alt="할인탐정 캐릭터"
          width={80}
          height={80}
          style={{ height: "auto" }}
          priority
        />
      </div>
    </div>
  );
};
