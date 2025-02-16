"use client";

import Link from "next/link";
import Image from "next/image";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
// @ts-ignore
import { FreeMode } from "swiper/modules";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import "swiper/css";
import {
  useFetchCategoriesQuery,
  useFetchSubCategoriesMutation,
} from "@/store/services/category";
import { RootState } from "@/store";
import DripCard from "@/components/DripCard";
import { imageBase, sort } from "@/utils/helpers";
import DripCardTwo from "@/components/DripCardTwo";
import HeaderSkeleton from "@/components/skeleton/Header";
import EmptyResults from "@/assets/img/empty-results.svg";
import ServiceSkeleton from "@/components/skeleton/Service";

const sortingOptions = [
  {
    id: 1,
    name: "Price (Low to High)",
  },
  {
    id: 2,
    name: "Price (High to Low)",
  },
  {
    id: 3,
    name: "Alphabetically",
  },
];

const DripListing = () => {
  const [limit, setLimit] = useState("All");
  const tabSubCatRef = useRef<SwiperRef>(null);
  const [viewType, setViewType] = useState(false);
  const mobileSubCatRef = useRef<SwiperRef>(null);
  const desktopSubCatRef = useRef<SwiperRef>(null);
  const [startSlide, setStartSlide] = useState(true);
  const [getSubCategories, { isLoading: subLoading }] =
    useFetchSubCategoriesMutation();
  const { selectedCategory: selected } = useSelector(
    (state: RootState) => state.global
  );
  const { data, isLoading } = useFetchCategoriesQuery({});
  const [startSubSlide, setStartSubSlide] = useState(true);
  const [activeCategory, setActiveCategory] = useState("0");
  const [sorting, setSorting] = useState("Price (Low to High)");
  const [selectedCategory, setSelectedCategory] = useState<CATEGORY | null>(
    selected
  );
  const [subCategories, setSubCategories] = useState<SERVICE_LIST[] | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("0");

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const offset = elementRect.top + scrollTop;
      const yOffset = offset - 300;

      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  const getSubs = async () => {
    const response = await getSubCategories(selectedCategory?.category_id);
    const data = response.data ?? [];

    setSubCategories(data);
  };

  useEffect(() => {
    setTimeout(() => {
      tabSubCatRef?.current?.swiper?.slideTo(
        parseInt(activeCategory),
        500,
        false
      );
      mobileSubCatRef?.current?.swiper?.slideTo(
        parseInt(activeCategory),
        500,
        false
      );
      desktopSubCatRef?.current?.swiper?.slideTo(
        parseInt(activeCategory),
        500,
        false
      );
    }, 100);
  }, [activeCategory]);

  useEffect(() => {
    if (selected) {
      setSelectedCategory(selected);
    } else {
      setSelectedCategory(data?.[1]!);
    }
  }, [data]);

  useEffect(() => {
    if (selectedCategory) {
      getSubs();
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      subCategories?.forEach((_, idx) => {
        const element = document.getElementById(idx.toString());
        if (element) {
          const elementRect = element.getBoundingClientRect();
          if (elementRect.top - 300 <= 0 && elementRect.bottom - 300 >= 0) {
            setActiveCategory(idx.toString());
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [subCategories]);

  return (
    <div className="w-full bg-light-primary dark:bg-secondary">
      <div className="fixed w-full z-20 top-[60px] sm:top-[80px] left-0 bg-white dark:bg-primary border-b border-light-primary dark:border-secondary">
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto">
          <div className="w-full block sm:hidden py-2.5 shadow-sm">
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
                  <div
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full h-12 flex items-center justify-center cursor-pointer gap-3 py-2 px-3 ${
                      selectedCategory?.category_id === category.category_id
                        ? "bg-accent text-white"
                        : "bg-light-primary dark:bg-secondary text-light-text dark:text-white"
                    }`}
                  >
                    <Image
                      src={`${imageBase(category.icon)}`}
                      alt="icon"
                      width={56}
                      height={56}
                      className="size-6"
                    />
                    <span className="text-left font-semibold text-[10px] w-full">
                      {category.category_name}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {subCategories?.length !== 0 && (
            <div className="w-full block sm:hidden pb-2.5">
              <Swiper
                ref={mobileSubCatRef}
                freeMode={true}
                spaceBetween={10}
                slidesPerView={2.2}
                modules={[FreeMode]}
                onSlideChange={(swiper) => {
                  if (swiper.activeIndex === 0) {
                    setStartSubSlide(true);
                  } else {
                    setStartSubSlide(false);
                  }
                }}
              >
                {subCategories?.map((sub, idx) => (
                  <SwiperSlide
                    key={idx}
                    className={`${startSubSlide && idx === 0 ? "ml-5" : ""}`}
                  >
                    <div
                      onClick={() => {
                        scrollToElement(idx.toString());
                        setActiveCategory(idx.toString());
                      }}
                      className={`flex items-center justify-center cursor-pointer space-x-1 py-2 ${
                        parseInt(activeCategory) === idx
                          ? "bg-accent text-white"
                          : "bg-light-primary dark:bg-secondary text-light-text dark:text-white"
                      }`}
                    >
                      <span className="text-center font-semibold text-xs w-full overflow-hidden truncate">
                        {sub.name}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          <div className="w-full hidden sm:block md:hidden py-2.5 px-5 shadow-md">
            {data?.length! <= 4 ? (
              <div className={`w-full grid grid-cols-${data?.length!} gap-4`}>
                {data?.map((category, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full h-[44px] flex items-center justify-center cursor-pointer gap-4 px-3.5 ${
                      selectedCategory?.category_id === category.category_id
                        ? "bg-accent text-white"
                        : "bg-light-primary dark:bg-secondary text-light-text dark:text-white"
                    }`}
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
                  </div>
                ))}
              </div>
            ) : (
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={4.7}
                modules={[FreeMode]}
              >
                {data?.map((category, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full h-[44px] flex items-center justify-center text-white cursor-pointer gap-4 pr-3 pl-4 ${
                        selectedCategory?.category_id === category.category_id
                          ? "bg-accent"
                          : "bg-secondary"
                      }`}
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
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="w-full hidden md:block lg:hidden py-2.5">
            {data?.length! <= 4 ? (
              <div className={`w-full grid grid-cols-${data?.length!} gap-4`}>
                {data?.map((category, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full h-[44px] flex items-center justify-center cursor-pointer gap-4 px-3.5 ${
                      selectedCategory?.category_id === category.category_id
                        ? "bg-accent text-white"
                        : "bg-light-primary dark:bg-secondary text-light-text dark:text-white"
                    }`}
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
                  </div>
                ))}
              </div>
            ) : (
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={4.7}
                modules={[FreeMode]}
              >
                {data?.map((category, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full h-[44px] flex items-center justify-center text-white cursor-pointer gap-4 pr-3 pl-4 ${
                        selectedCategory?.category_id === category.category_id
                          ? "bg-accent"
                          : "bg-secondary"
                      }`}
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
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="w-full hidden lg:block py-2.5">
            {data?.length! <= 4 ? (
              <div className={`w-full grid grid-cols-${data?.length!} gap-4`}>
                {data?.map((category, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full h-[44px] flex items-center justify-center cursor-pointer gap-4 px-3.5 ${
                      selectedCategory?.category_id === category.category_id
                        ? "bg-accent text-white"
                        : "bg-light-primary dark:bg-secondary text-light-text dark:text-white"
                    }`}
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
                  </div>
                ))}
              </div>
            ) : (
              <Swiper
                freeMode={true}
                spaceBetween={10}
                slidesPerView={4.7}
                modules={[FreeMode]}
              >
                {data?.map((category, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full h-[52px] flex items-center justify-center cursor-pointer text-white gap-4 pr-3 lg:pr-14 xl:pl-6 xl:pr-16 pl-4 ${
                        selectedCategory?.category_id === category.category_id
                          ? "bg-accent"
                          : "bg-secondary"
                      }`}
                    >
                      <Image
                        src={`${imageBase(category.icon)}`}
                        alt="icon"
                        width={56}
                        height={56}
                        className="size-7 lg:size-9 3xl:size-9"
                      />
                      <span className="text-left font-bold text-xs flex-1">
                        {category.category_name}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
      <div className="relative w-full md:w-[90%] lg:max-w-[1440px] mx-auto hidden sm:flex mt-[140.75px] sm:mt-[144px] lg:mt-[152px] items-start justify-start">
        {isLoading ? (
          <div className="w-full flex items-center justify-center px-5 md:px-0 py-7">
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(12)].map((_, idx) => (
                <ServiceSkeleton key={idx} />
              ))}
            </div>
          </div>
        ) : subCategories?.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center sm:h-[calc(100vh-144px)] lg:h-[calc(100vh-152px)]">
            <Image
              src={EmptyResults}
              alt="empty-wishlist"
              className="size-36 lg:size-44"
            />
            <p className="w-full text-center text-[28px] font-semibold mt-3 text-accent">
              Sorry, We Couldn&apos;t Find the Page
            </p>
            <p className="w-full text-center font-semibold text-sm lg:text-base text-light-text dark:text-white">
              What you searched was unfortunately
              <br />
              Not found or doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="mt-12 bg-accent text-white text-[20px] font-regular pt-1.5 pb-2 px-20 place-self-center"
            >
              Go Back
            </Link>
          </div>
        ) : (
          <div className="relative w-full sm:h-[calc(100vh-144px)] lg:h-[calc(100vh-152px)] flex items-start justify-start gap-5 px-5 md:px-0">
            <div className="sticky sm:top-[144px] lg:top-[152px] left-0 w-[30%] md:w-[25%] max-h-full overflow-auto custom-scrollbar flex flex-col bg-white dark:bg-primary divide-y divide-light-primary dark:divide-primary">
              {subCategories?.map((sub, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSubCategory(idx.toString())}
                  className={`w-full cursor-pointer flex items-center justify-start gap-4 p-3 hover:bg-accent  ${
                    selectedSubCategory === idx.toString()
                      ? "bg-accent text-white"
                      : "bg-white dark:bg-highlight text-light-text dark:text-white"
                  }`}
                >
                  <Image
                    src={sub.icon}
                    alt="sub-icon"
                    width={50}
                    height={50}
                    className="size-7"
                  />
                  <p className="w-full text-left text-xs lg:text-sm font-medium">
                    {sub.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="relative w-[70%] md:w-[75%] max-h-full overflow-auto custom-scrollbar flex flex-col gap-4 mt-2">
              <div className="sticky top-0 z-10 md:mr-5 flex items-center justify-between bg-white dark:bg-primary rounded-lg py-2 px-4">
                <div className="flex items-center justify-start gap-2">
                  <button type="button" onClick={() => setViewType(false)}>
                    <FaThList
                      className={`size-6 ${
                        viewType ? "text-gray-400" : "text-accent"
                      }`}
                    />
                  </button>
                  <button type="button" onClick={() => setViewType(true)}>
                    <IoGrid
                      className={`size-6 ${
                        viewType ? "text-accent" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
                <div className="w-full flex items-center justify-end gap-6">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-light-text dark:text-white">
                      Sort By
                    </span>
                    <div className="bg-light-primary dark:bg-secondary pr-2.5 rounded-md">
                      <select
                        onChange={(e) => setSorting(e.target.value)}
                        className="text-xs p-2 rounded-md bg-transparent text-light-text dark:text-white"
                      >
                        {sortingOptions.map((item) => (
                          <option
                            key={item.id}
                            value={item.name}
                            className="text-light-text"
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-light-text dark:text-white">
                      Show Listing
                    </span>
                    <div className="bg-light-primary dark:bg-secondary pr-2.5 rounded-md">
                      <select
                        onChange={(e) => setLimit(e.target.value)}
                        className="text-xs p-2 rounded-md bg-transparent text-light-text dark:text-white"
                      >
                        <option
                          value="1"
                          selected={limit === "1"}
                          className="text-light-text dark:text-white"
                        >
                          1
                        </option>
                        <option
                          value="2"
                          selected={limit === "2"}
                          className="text-light-text dark:text-white"
                        >
                          2
                        </option>
                        <option
                          value="3"
                          selected={limit === "3"}
                          className="text-light-text dark:text-white"
                        >
                          3
                        </option>
                        <option
                          value="4"
                          selected={limit === "4"}
                          className="text-light-text dark:text-white"
                        >
                          4
                        </option>
                        <option
                          value="5"
                          selected={limit === "5"}
                          className="text-light-text dark:text-white"
                        >
                          5
                        </option>
                        <option
                          value="6"
                          selected={limit === "6"}
                          className="text-light-text dark:text-white"
                        >
                          6
                        </option>
                        <option
                          value="All"
                          selected={limit === "All"}
                          className="text-light-text dark:text-white"
                        >
                          All
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`w-full grid pb-5 md:pr-5 ${
                  viewType
                    ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2"
                    : "grid-cols-1 lg:grid-cols-2 gap-2"
                }`}
              >
                <h1
                  className={`w-full text-left font-bold text-lg text-light-text dark:text-white ${
                    viewType
                      ? "col-span-2 md:col-span-2 lg:col-span-3"
                      : "col-span-1 lg:col-span-2"
                  }`}
                >
                  {subCategories?.[parseInt(selectedSubCategory)]?.name}
                </h1>
                {limit === "All"
                  ? sort(
                      sorting,
                      subCategories?.[parseInt(selectedSubCategory)]?.services
                    )?.map((service) => {
                      if (!viewType) {
                        return (
                          <DripCard
                            key={service.service_id}
                            item={service}
                            bundle={false}
                          />
                        );
                      } else {
                        return (
                          <DripCardTwo
                            key={service.service_id}
                            item={service}
                            bundle={false}
                          />
                        );
                      }
                    })
                  : subCategories?.[parseInt(selectedSubCategory)]?.services
                      .slice(0, parseInt(limit))
                      .map((service) => {
                        if (!viewType) {
                          return (
                            <DripCard
                              key={service.service_id}
                              item={service}
                              bundle={false}
                            />
                          );
                        } else {
                          return (
                            <DripCard
                              key={service.service_id}
                              item={service}
                              bundle={false}
                            />
                          );
                        }
                      })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full sm:hidden mt-[170.25px] mb-24 px-5 pt-1.5">
        {subLoading ? (
          <div className="w-full xl:w-[85%] 3xl:w-[70%] xl:mx-auto grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="col-span-1 xl:col-span-2 w-full">
              <HeaderSkeleton />
            </div>
            <div className="col-span-1 xl:col-span-2 w-full grid grid-cols-2 gap-5">
              {[...Array(10)].map((_, idx) => (
                <ServiceSkeleton key={idx} />
              ))}
            </div>
          </div>
        ) : subCategories?.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center h-[calc(100vh-340px)]">
            <Image
              src={EmptyResults}
              alt="empty-wishlist"
              className="size-24"
            />
            <p className="w-full text-center text-[26px] text-accent font-semibold mt-3">
              Sorry
              <br />
              The results were not found!
            </p>
            <p className="w-full text-center font-semibold text-base text-light-text dark:text-white">
              Explore more and shortlist
              <br />
              some services
            </p>
            <Link
              href="/"
              className="mt-12 bg-accent text-white text-[20px] font-bold pt-1.5 pb-2 px-24 place-self-center"
            >
              Go Back
            </Link>
          </div>
        ) : (
          subCategories?.map((sub, idx) => (
            <div
              key={idx}
              id={idx.toString()}
              className="w-full xl:w-[85%] 3xl:w-[70%] mt-2.5 xl:mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 xl:mb-20"
            >
              <div className="col-span-1 md:col-span-2 w-full flex flex-col items-center space-y-4 mb-4">
                <h1 className="w-full text-left text-xl xl:text-2xl font-bold text-light-text dark:text-white">
                  {sub?.name}
                </h1>
                {sub?.cover_image && (
                  <Image
                    src={`${imageBase(sub?.cover_image)}`}
                    alt="cover-image"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </div>
              {sub?.services.map((service) => (
                <DripCard
                  key={service.service_id}
                  item={service}
                  bundle={false}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DripListing;
