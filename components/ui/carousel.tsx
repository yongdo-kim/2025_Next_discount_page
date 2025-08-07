"use client";

import { Badge } from "@/components/ui/badge";
import SmartImage from "@/components/ui/SmartImage";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type CarouselProps = {
  title: string;
  thumbnailUrl: string;
  id: number;
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
          <Link href={`/posts/${item.id}`}>
            <div className="relative">
              <SmartImage
                src={item.thumbnailUrl || ""}
                className="h-[180px] w-full rounded-md object-cover"
                alt={item.title}
                width={600}
                height={400}
                loading="eager"
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
