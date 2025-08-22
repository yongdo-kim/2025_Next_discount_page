import Image from "next/image";

export const MainAdBanners = () => {
  return (
    <div className="relative container mx-auto my-6 flex h-[120px] w-full items-center justify-center overflow-hidden rounded-lg border border-gray-600 px-6 py-4 md:h-[200px]">
      {/* 배경 원형 요소들 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-14 w-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-50 sm:h-18 sm:w-18 md:h-22 md:w-22 lg:h-32 lg:w-32"></div>
        <div className="absolute top-2 right-4 h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-50 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-22 lg:w-22"></div>
        <div className="absolute bottom-2 left-24 h-13 w-13 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-50 sm:h-17 sm:w-17 md:h-20 md:w-20 lg:h-24 lg:w-24"></div>
        <div className="absolute right-32 bottom-2 h-11 w-11 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 opacity-50 sm:h-15 sm:w-15 md:h-16 md:w-16 lg:h-20 lg:w-20"></div>
      </div>

      <div className="relative z-1 flex items-center justify-center space-x-4">
        <h1 className="text-sm font-bold text-white lg:text-xl">
          할인탐정에 어서오세요
        </h1>
        <Image
          src="/discount-character-1024.webp"
          alt="할인탐정 캐릭터"
          width={80}
          height={80}
          priority
        />
      </div>
    </div>
  );
};
