import Image from "next/image";

export const MainAdBanners = () => {
  return (
    <div className="flexlg:h-[200px] container mx-auto my-6 w-full items-center justify-center rounded-lg border border-gray-600 px-6 py-4">
      <div className="flex items-center justify-center space-x-4">
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
