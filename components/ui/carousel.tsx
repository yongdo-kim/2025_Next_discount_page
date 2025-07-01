/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Badge } from "./badge";

type CarouselProps = {
  title: string;
  thumbnailUrl: string;
}[];

export default function Carousel({ data }: { data: CarouselProps }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{
        clickable: true, // 클릭 가능한 인디케이터
      }}
      autoplay={{
        delay: 5000, // 자동 슬라이드 시간
      }}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
    >
      {data.map((item) => (
        <SwiperSlide
          className="cursor-pointer overflow-hidden"
          key={item.title}
        >
          <Link href={`/categories/${item.title}`}>
            <div className="relative">
              <img
                src={item.thumbnailUrl || ""}
                className="aspect-video h-[300px] w-full object-cover"
                alt={item.title}
                width={600}
                height={400}
              />
              <div className="absolute inset-0" />
              <div className="absolute right-0 bottom-0 p-6 text-white">
                <Badge
                  variant="secondary"
                  className="px-4 py-2 text-3xl font-bold"
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
