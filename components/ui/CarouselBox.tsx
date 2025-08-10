"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicSwiper = dynamic(() => import("./DynamicSwiper"), {
  loading: () => (
    <div className="relative h-[120px] w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700 sm:h-[180px] md:h-[200px] lg:h-[200px]">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute right-0 bottom-0.5 p-6">
        <div className="h-8 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-600 md:h-10 md:w-32 lg:h-12 lg:w-40" />
      </div>
    </div>
  ),
});

type CarouselProps = {
  title: string;
  thumbnailUrl: string;
  id: number;
}[];

export default function CarouselBox({ data }: { data: CarouselProps }) {
  return (
    <Suspense fallback={
      <div className="relative h-[120px] w-full overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700 sm:h-[180px] md:h-[200px] lg:h-[200px]">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute right-0 bottom-0.5 p-6">
          <div className="h-8 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-600 md:h-10 md:w-32 lg:h-12 lg:w-40" />
        </div>
      </div>
    }>
      <DynamicSwiper data={data} />
    </Suspense>
  );
}
