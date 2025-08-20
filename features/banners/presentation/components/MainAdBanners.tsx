import Image from "next/image";

export const MainAdBanners = () => {
  return (
    <div className="container mx-auto flex h-[200px] w-full items-center justify-center rounded-lg border border-neutral-200">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-white">할인탐정에 어서오세요</h1>
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
