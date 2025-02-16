/* eslint-disable @next/next/no-img-element */
"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import HeaderSkeleton from "./skeleton/Header";
import { useFetchHomeBannersQuery } from "@/store/services/home";

import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Pagination, EffectFade, Autoplay } from "swiper/modules";

const Header = () => {
  const { data, isLoading } = useFetchHomeBannersQuery({});

  return (
    <div className="w-[90%] sm:w-full mx-auto bg-gradient-to-l from-accent to-[#383838] !mt-[80px]">
      <Swiper
        loop={true}
        effect={"fade"}
        slidesPerView={1}
        spaceBetween={10}
        pagination={true}
        autoplay={{
          delay: 3000,
        }}
        modules={[Pagination, EffectFade, Autoplay]}
      >
        {isLoading ? (
          <SwiperSlide>
            <HeaderSkeleton />
          </SwiperSlide>
        ) : (
          data?.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={banner.image}
                alt="banner"
                className="w-full"
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default Header;
