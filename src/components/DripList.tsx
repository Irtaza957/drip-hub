import "swiper/css";
import "swiper/css/grid";
import DripCard from "./DripCard";
import ListTitle from "./global/ListTitle";
import { formatString } from "@/utils/helpers";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Grid, FreeMode, Navigation } from "swiper/modules";

const DripList = ({
  tag,
  logo,
  data,
  title,
  bundle,
}: {
  tag?: string;
  title: string;
  logo?: boolean;
  bundle?: boolean;
  data: DRIP_CARD[];
}) => {
  const [startSlide, setStartSlide] = useState(true);

  return (
    <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto flex flex-col items-center justify-center space-y-5">
      <ListTitle logo={logo} title={title} />
      <div className="w-full block sm:hidden">
        <Swiper
          modules={[Grid, FreeMode]}
          slidesPerView={1.1}
          grid={{
            rows: 2,
            fill: "row",
          }}
          freeMode={true}
          spaceBetween={15}
          onSlideChange={(swiper) => {
            if (swiper.activeIndex === 0) {
              setStartSlide(true);
            } else {
              setStartSlide(false);
            }
          }}
        >
          {[...data].map((item, idx) => (
            <SwiperSlide
              key={item.category_id}
              className={`${
                startSlide &&
                (idx === 0 || idx === 4 || [...data].length === 4)
                  ? "pl-5"
                  : ""
              }`}
            >
              <DripCard item={item} tag={tag} bundle={bundle} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative w-full hidden sm:block md:hidden">
        <div
          className={`next-${formatString(
            title
          )} absolute cursor-pointer z-30 top-[45%] right-2 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
        >
          <ChevronRightIcon
            fillColor="#FF4B57"
            className="size-full text-accent"
          />
        </div>
        <div
          className={`prev-${formatString(
            title
          )} absolute cursor-pointer z-30 top-[45%] left-2 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
        >
          <ChevronRightIcon
            fillColor="#FF4B57"
            className="size-full text-accent rotate-180"
          />
        </div>
        <Swiper
          modules={[Grid, FreeMode, Navigation]}
          slidesPerView={1.5}
          grid={{
            rows: 2,
            fill: "row",
          }}
          freeMode={true}
          spaceBetween={15}
          navigation={{
            nextEl: `.next-${formatString(title)}`,
            prevEl: `.prev-${formatString(title)}`,
          }}
        >
          {data.map((item, idx) => (
            <SwiperSlide
              key={item.category_id}
              className={`${
                startSlide && (idx === 0 || idx === 2) ? "pl-5" : ""
              }`}
            >
              <DripCard item={item} tag={tag} bundle={bundle} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative w-full hidden md:block lg:hidden">
        <div
          className={`next-${formatString(
            title
          )} absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
        >
          <ChevronRightIcon
            fillColor="#FF4B57"
            className="size-full text-accent"
          />
        </div>
        <div
          className={`prev-${formatString(
            title
          )} absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
        >
          <ChevronRightIcon
            fillColor="#FF4B57"
            className="size-full text-accent rotate-180"
          />
        </div>
        <Swiper
          modules={[Grid, FreeMode, Navigation]}
          slidesPerView={1.9}
          grid={{
            rows: 2,
            fill: "row",
          }}
          freeMode={true}
          spaceBetween={15}
          navigation={{
            nextEl: `.next-${formatString(title)}`,
            prevEl: `.prev-${formatString(title)}`,
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.category_id}>
              <DripCard item={item} tag={tag} bundle={bundle} />
            </SwiperSlide>
          ))}
          {data.map((item) => (
            <SwiperSlide key={item.category_id}>
              <DripCard item={item} tag={tag} bundle={bundle} />
            </SwiperSlide>
          ))}
          {data.map((item) => (
            <SwiperSlide key={item.category_id}>
              <DripCard item={item} tag={tag} bundle={bundle} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative w-full hidden lg:block">
        <div
          className={`next-${formatString(
            title
          )} absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
        >
          <ChevronRightIcon
            fillColor="#FF4B57"
            className="size-full text-accent"
          />
        </div>
        <div
          className={`prev-${formatString(
            title
          )} absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
        >
          <ChevronRightIcon
            fillColor="#FF4B57"
            className="size-full text-accent rotate-180"
          />
        </div>
        <Swiper
          modules={[Grid, FreeMode, Navigation]}
          slidesPerView={2.75}
          grid={{
            rows: 2,
            fill: "row",
          }}
          freeMode={true}
          spaceBetween={15}
          navigation={{
            nextEl: `.next-${formatString(title)}`,
            prevEl: `.prev-${formatString(title)}`,
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.category_id}>
              <DripCard item={item} tag={tag} bundle={bundle} />
            </SwiperSlide>
          ))}
          {data.map((item) => (
            <SwiperSlide key={item.category_id}>
              <DripCard item={item} tag={tag} bundle={bundle} />
            </SwiperSlide>
          ))}
          {data.map((item) => (
            <SwiperSlide key={item.category_id}>
              <DripCard item={item} tag={tag} bundle={bundle} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DripList;
