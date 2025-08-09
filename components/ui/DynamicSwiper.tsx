"use client";

import { Badge } from "@/components/shadcn/badge";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type CarouselProps = {
  title: string;
  thumbnailUrl: string;
  id: number;
}[];

export default function DynamicSwiper({ data }: { data: CarouselProps }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 5000,
      }}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
    >
      {data.map((item, index) => (
        <SwiperSlide
          className="cursor-pointer overflow-hidden"
          key={item.title}
        >
          <Link href={`/posts/${item.id}`}>
            <div className="relative">
              <Image
                src={item.thumbnailUrl || ""}
                className="h-[120px] w-full rounded-md object-cover sm:h-[180px] md:h-[200px] lg:h-[200px]"
                alt={item.title}
                width={600}
                height={180}
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 600px"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
              />
              <div className="absolute inset-0" />
              <div className="absolute right-0 bottom-0.5 p-6 text-white">
                <Badge
                  variant="secondary"
                  className="text-md px-4 py-2 font-bold md:text-2xl lg:text-3xl"
                >
                  {item.title}
                </Badge>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}