"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const carouselImageClass =
  "w-full object-cover h-[150px] sm:h-[250px] md:h-[300px] lg:max-h-[400px]";
export default function Carousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{
        clickable: true, // 클릭 가능한 인디케이터
      }}
      autoplay={{
        delay: 5000, // 자동 슬라이드 시간
        disableOnInteraction: false, // 사용자 인터랙션으로 슬라이드 중지 여부
      }}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
    >
      <SwiperSlide>
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
          className={carouselImageClass}
          alt=""
          width={800}
          height={400}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800"
          className={carouselImageClass}
          alt=""
          width={800}
          height={400}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
          className={carouselImageClass}
          alt=""
          width={800}
          height={400}
        />
      </SwiperSlide>
    </Swiper>
  );
}
