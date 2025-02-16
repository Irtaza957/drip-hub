"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from "@/components/Header";
import { setCountry } from "@/store/global";
import DripList from "@/components/DripList";
import Categories from "@/components/Categories";
import { fetchCountryFromIP } from "@/utils/helpers";
import ServiceSkeleton from "@/components/skeleton/Service";
import { useFetchHomeDataQuery } from "@/store/services/home";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchHomeDataQuery({});

  const setCountryCode = (code: string) => {
    dispatch(setCountry(code));
  };

  useEffect(() => {
    fetchCountryFromIP(setCountryCode);
  }, []);

  return (
    <div className="w-full flex flex-col pb-10 xl:pb-20 items-center justify-center bg-light-primary dark:bg-secondary">
      <Header />
      <Categories />
      <div className="w-full flex flex-col items-start justify-start mt-10 gap-14">
        {isLoading ? (
          <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-5 md:px-0">
            {[...Array(8)].map((_, idx) => (
              <ServiceSkeleton key={idx} />
            ))}
          </div>
        ) : (
          data?.map((section: DRIP, idx: number) => (
            <DripList
              key={idx}
              tag={
                section.section.includes("Best")
                  ? "best"
                  : section.section.includes("Choice")
                  ? "choice"
                  : ""
              }
              bundle={section.section.includes("Bundle") ? true : false}
              title={section.section}
              data={section.section_data}
              logo={
                section.section.includes("Best") ||
                section.section.includes("Choice")
                  ? true
                  : false
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
