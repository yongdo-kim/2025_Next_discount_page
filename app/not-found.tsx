"use client";
import { Button } from "@/components/shadcn/button";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Image
        priority={true}
        src="/discount-character.png"
        width={256}
        height={256}
        alt="logo"
      />
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
