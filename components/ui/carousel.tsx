"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Carousel() {
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
      <SwiperSlide className="cursor-pointer overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
          className="h-[100px] w-full object-cover md:h-[200px] lg:h-[300px]"
          alt=""
          width={800}
          height={400}
        />
      </SwiperSlide>
      {/* <SwiperSlide>
        <Image
          src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800"
          className="h-[150px] w-full rounded-full object-cover sm:h-[250px] sm:rounded-none md:h-[300px] lg:max-h-[400px]"
          alt=""
          width={800}
          height={400}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
          className="h-[150px] w-full rounded-full object-cover sm:h-[250px] sm:rounded-none md:h-[300px] lg:max-h-[400px]"
          alt=""
          width={800}
          height={400}
        />
      </SwiperSlide> */}
    </Swiper>
  );
}
