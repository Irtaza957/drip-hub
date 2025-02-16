"use client";

import Link from "next/link";
import Image from "next/image";
// @ts-ignore
import { FreeMode } from "swiper/modules";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";

import "swiper/css";
import { imageBase } from "@/utils/helpers";
import { setSelectedCategory } from "@/store/global";
import PurpleDrip from "@/assets/img/drips/purple-drip.svg";
import { useFetchCategoriesQuery } from "@/store/services/category";
import CategorySkeletion from "./skeleton/Category";

const Categories = () => {
  const dispatch = useDispatch();
  const categoryRef = useRef<HTMLDivElement>(null);
  const categoryDRef = useRef<HTMLDivElement>(null);
  const [startSlide, setStartSlide] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  const { data, isLoading } = useFetchCategoriesQuery({});

  const selectCategory = (value: CATEGORY) => {
    dispatch(setSelectedCategory(value));
  };

  useEffect(() => {
    let hasUserInteracted = false;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (!hasUserInteracted) return;

      entries.forEach((entry) => {
        const adjustedTop = entry.boundingClientRect.top - 120;

        if (entry.intersectionRatio === 0 && adjustedTop <= 0) {
          setShowSlider(true);
        } else {
          setShowSlider(false);
        }
      });
    };

    const handleScroll = () => {
      hasUserInteracted = true;
    };

    const observerOptions = {
      root: null,
      threshold: [0, 1],
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (categoryRef.current) observer.observe(categoryRef.current);
    if (categoryDRef.current) observer.observe(categoryDRef.current);

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (categoryRef.current) observer.unobserve(categoryRef.current);
      if (categoryDRef.current) observer.unobserve(categoryDRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  return (
    <>
      <div
        className={`fixed ${
          showSlider ? "flex" : "hidden"
        } w-full shadow-md z-40 top-[60px] sm:top-[80px] !m-0 left-0 bg-white dark:bg-primary`}
      >
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto sm:px-5 md:px-0">
          <div className="block sm:hidden py-2.5">
            <Swiper
              freeMode={true}
              spaceBetween={10}
              slidesPerView={3.1}
              modules={[FreeMode]}
              onSlideChange={(swiper) => {
                if (swiper.activeIndex === 0) {
                  setStartSlide(true);
                } else {
                  setStartSlide(false);
                }
              }}
            >
              {data?.map((category, idx) => (
                <SwiperSlide
                  key={idx}
                  className={`${startSlide && idx === 0 ? "ml-5" : ""}`}
                >
                  <Link
                    href="/drips"
                    onClick={() => selectCategory(category)}
                    className="w-full h-12 bg-light-primary dark:bg-secondary text-light-text dark:text-white flex items-center justify-center cursor-pointer gap-3 py-2 px-4"
                  >
                    <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="size-6"
                    />
                    <span className="w-full text-left font-semibold text-[10px]">
                      {category.category_name}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full hidden sm:block md:hidden py-2.5">
            <Swiper
              freeMode={true}
              spaceBetween={10}
              slidesPerView={4.7}
              modules={[FreeMode]}
            >
              {data?.map((category, idx) => (
                <SwiperSlide key={idx}>
                  <Link
                    href="/drips"
                    onClick={() => selectCategory(category)}
                    className="w-full h-[44px] flex items-center justify-center cursor-pointer gap-4 pr-3 pl-4 bg-light-primary dark:bg-secondary text-light-text dark:text-white"
                  >
                    <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="w-7 h-7"
                    />
                    <span className="text-left font-bold text-xs flex-1">
                      {category.category_name}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full hidden md:block lg:hidden py-2.5">
            <Swiper
              freeMode={true}
              spaceBetween={10}
              slidesPerView={6}
              modules={[FreeMode]}
            >
              {data?.map((category, idx) => (
                <SwiperSlide key={idx}>
                  <Link
                    href="/drips"
                    onClick={() => selectCategory(category)}
                    className="w-full h-[44px] flex items-center justify-center cursor-pointer gap-4 pr-3 pl-4 bg-light-primary dark:bg-secondary text-light-text dark:text-white"
                  >
                    <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="w-7 h-7"
                    />
                    <span className="text-left font-bold text-xs flex-1">
                      {category.category_name}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full hidden lg:block py-2.5">
            <Swiper
              freeMode={true}
              spaceBetween={10}
              slidesPerView={6}
              modules={[FreeMode]}
            >
              {data?.map((category, idx) => (
                <SwiperSlide key={idx}>
                  <Link
                    href="/drips"
                    onClick={() => selectCategory(category)}
                    className="w-full h-[52px] bg-light-primary dark:bg-secondary text-light-text dark:text-white flex items-center justify-center cursor-pointer gap-4 pr-3 lg:pr-5 xl:pl-6 xl:pr-16 pl-4"
                  >
                    <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="size-7 lg:size-9 3xl:size-9"
                    />
                    <span className="text-left font-bold text-sm flex-1">
                      {category.category_name}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div
        ref={categoryDRef}
        className="w-full hidden md:flex items-center justify-center"
      >
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto grid py-10 lg:py-5 xl:py-10 mb-5 xl:mb-0 grid-cols-4 gap-3">
          {isLoading
            ? [...Array(4)].map((_, idx) => <CategorySkeletion key={idx} />)
            : data?.map((category) => (
                <Link
                  href="/drips"
                  key={category.category_id}
                  onClick={() => selectCategory(category)}
                  className="w-full h-full flex items-center justify-center bg-white dark:bg-highlight/60 text-light-text dark:text-white p-4 group hover:border hover:scale-105 border-accent/50 transition-all ease-linear duration-150 shadow-sm shadow-blue-200 dark:shadow-none"
                >
                  <Image
                    src={PurpleDrip}
                    width={50}
                    height={50}
                    alt="category"
                    className="size-16 lg:size-20"
                  />
                  <span className="text-sm !leading-[18px] lg:text-base xl:text-lg 3xl:text-xl lg:!leading-[22px] xl: 3xl:!leading-[24px] font-bold">
                    {category.category_name}
                  </span>
                </Link>
              ))}
        </div>
      </div>
      <div ref={categoryRef} className="flex md:hidden w-full p-5">
        <div
          className={`w-full h-full ${
            showSlider && "invisible"
          } grid grid-cols-2 sm:grid-cols-3 items-center justify-center gap-3`}
        >
          {isLoading
            ? [...Array(4)].map((_, idx) => <CategorySkeletion key={idx} />)
            : data?.map((category) => (
                <Link
                  href="/drips"
                  key={category.category_id}
                  onClick={() => selectCategory(category)}
                  className="col-span-1 w-full h-full flex items-center justify-center bg-white dark:bg-highlight/50 text-light-text dark:text-white p-3 shadow-sm shadow-blue-200 dark:shadow-none"
                >
                  <Image
                    src={PurpleDrip}
                    width={50}
                    height={96}
                    alt="category"
                    className="size-[70px]"
                  />
                  <span className="w-full text-left font-bold text-xs">
                    {category.category_name}
                  </span>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
