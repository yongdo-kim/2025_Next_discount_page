"use client";

import { Badge } from "@/components/shadcn/badge";
import Link from "next/link";
import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

type CarouselProps = {  
  title: string;
  thumbnailUrl: string;
  id: number;
}[];

export default function CarouselBox({ data }: { data: CarouselProps }) {
  //
  useEffect(() => {
    if (data.length > 0 && data[0].thumbnailUrl) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = data[0].thumbnailUrl;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [data]);

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
                className="h-[180px] w-full rounded-md object-cover"
                alt={item.title}
                width={600}
                height={180}
                priority={index === 0}
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
