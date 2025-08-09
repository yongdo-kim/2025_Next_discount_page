"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicSwiper = dynamic(() => import("./DynamicSwiper"), {
  ssr: false,
  loading: () => (
    <div className="h-[120px] w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 sm:h-[180px] md:h-[200px] lg:h-[200px]" />
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
      <div className="h-[120px] w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 sm:h-[180px] md:h-[200px] lg:h-[200px]" />
    }>
      <DynamicSwiper data={data} />
    </Suspense>
  );
}
