"use client";

import {
  useFetchCategoriesQuery,
  useFetchSubCategoriesMutation,
} from "@/store/services/category";
import Drip from "@/assets/img/drip.svg";
import AutoComplete from "./AutoComplete";
import { getCategoryLink, getSlug, truncateString } from "@/utils/helpers";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import Link from "next/link";
import Image from "next/image";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

type ITEM = {
  id: string;
  name: string;
  image: string;
};

const Search = () => {
  const menuRef = useRef(null);
  const [category, setCategory] = useState<number>(60);
  const [list, setList] = useState<ITEM[] | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedSub, setSelectedSub] = useState<string>("7");
  const [getSubCategories, { isLoading }] = useFetchSubCategoriesMutation();
  const [subCategories, setSubCategories] = useState<SERVICE_LIST[] | null>(
    null
  );
  const router=useRouter()
  const { data } = useFetchCategoriesQuery(undefined, { skip: !showMenu, refetchOnMountOrArgChange: true });
  useOnClickOutside(menuRef, () => {
    setShowMenu(false);
    setCategory(parseInt(data?.[0].category_id!));
  });

  const getSubs = async () => {
    if(category){
      const response = await getSubCategories(category);
      const data = response.data ?? [];

      setSubCategories(data);
    }
  };

  useEffect(() => {
    if (data) {
      const finalList: ITEM[] = data?.map((item) => {
        return {
          image: item.icon,
          id: item.category_id,
          name: item.category_name,
        };
      });

      setList(finalList);
      setCategory(parseInt(data[0].category_id));
    }
  }, [data]);

  useEffect(() => {
    setSelectedSub("0");
    if(showMenu){
      getSubs();
    }
  }, [category, showMenu]);

  useEffect(() => {
    if (subCategories) {
      if (subCategories.length > 0) {
        setSelectedSub(subCategories[0].id);
      }
    }
  }, [subCategories]);

  const handleCategoryClick = (id: string) => {
    setShowMenu(false)
    router.push(getCategoryLink(list?.find(item=>item.id===String(id))?.name!))
  }

  const getNavLink = (service_name: string) => {
    if (service_name) {
      return `/${getSlug(list?.find(item=>item.id===String(category))?.name!) || ''}/${getSlug(subCategories?.[parseInt(selectedSub)-2]?.name || '')}/${getSlug(service_name)}`
    }
  }

  return (
    <>
      <div className="w-full h-10 hidden sm:flex bg-[#C9C9C9]/40 border border-white dark:border-primary">
        <div
          ref={menuRef}
          className="relative w-1/2 md:w-1/3 lg:w-1/4 h-full col-span-4 lg:col-span-3 xl:col-span-2 flex items-start justify-start"
        >
          <button
            type="button"
            onClick={() => {
              if (showMenu) {
                setShowMenu(false);
                setCategory(parseInt(data?.[0].category_id!));
              } else {
                setShowMenu(true);
              }
            }}
            className="w-full h-full text-left text-xs flex items-center justify-center gap-2 bg-accent px-2"
          >
            <span className="w-full text-left text-base font-medium uppercase pl-4 pb-1">
              All Categories
            </span>
            <ChevronDownIcon className="size-3" />
          </button>
          <div
            className={`absolute md:top-2 z-50 h-[400px] xl:h-[500px] 3xl:h-[600px] mt-12 md:mt-10 lg:mt-12 min-w-52 -left-[110px] md:-left-[125px] lg:left-0 shadow-lg overflow-hidden bg-white dark:bg-secondary ${
              showMenu ? "flex" : "hidden"
            } ${
              selectedSub &&
              subCategories?.some(
                (item) => item.id === selectedSub && item.services.length !== 0
              )
                ? "w-[730px] md:w-[922.5px] lg:w-[1155px] xl:w-[1300px]"
                : "w-[410px] md:w-[461.25px] lg:w-[577.5px] xl:w-[650px]"
            }`}
          >
            <div className="w-[410px] md:w-[461.25px] lg:w-[577.5px] xl:w-[650px] grid grid-cols-2 divide-x divide-light-primary dark:divide-primary">
              <div className="col-span-1 w-full max-h-full overflow-auto custom-scrollbar flex flex-col items-start justify-start divide-y divide-light-primary dark:divide-primary">
                {list?.map((option: ITEM, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCategoryClick(option.id)}
                    onMouseEnter={() => setCategory(parseInt(option.id))}
                    className={`w-full flex items-center justify-center p-3 hover:text-white hover:bg-accent cursor-pointer ${
                      category === parseInt(option.id)
                        ? "bg-accent text-white"
                        : "bg-white dark:bg-highlight text-light-text dark:text-white"
                    }`}
                  >
                    <span className="w-full text-left font-semibold text-xs xl:text-sm">
                      {option.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="col-span-1 w-full max-h-full overflow-auto custom-scrollbar flex flex-col items-start justify-start divide-y divide-light-primary dark:divide-primary">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <LuLoader2 className="size-10 animate-spin text-accent" />
                  </div>
                ) : subCategories?.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="w-full text-center text-xs text-light-text dark:text-white">
                      No Results
                    </span>
                  </div>
                ) : (
                  subCategories?.map((option: SERVICE_LIST, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setSelectedSub(option.id)}
                      className={`w-full flex items-center justify-center p-3 hover:text-white hover:bg-accent cursor-pointer ${
                        selectedSub === option.id
                          ? "bg-accent text-white"
                          : "bg-white dark:bg-highlight text-light-text dark:text-white"
                      }`}
                    >
                      <span className="w-full text-left font-semibold text-xs xl:text-sm">
                        {option.name}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
            {selectedSub &&
              subCategories?.some(
                (item) => item.id === selectedSub && item.services.length !== 0
              ) && (
                <div className="relative flex flex-col items-start justify-between">
                  <div className="w-[320px] md:w-[461.25px] lg:w-[577.5px] xl:w-[650px] h-fit max-h-full overflow-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 items-start justify-start xl:p-2.5">
                    {subCategories
                      ?.filter(
                        (sub) => parseInt(sub.id) === parseInt(selectedSub)
                      )[0]
                      ?.services?.map((service) => (
                        <Link
                          key={service.service_id}
                          onClick={() => setShowMenu(false)}
                          href={getNavLink(service.name || '') || `/drips/${service.service_id}`}
                          className="flex items-center justify-center space-x-2.5 p-3.5 hover:bg-accent"
                        >
                          <div className="size-14 flex items-center justify-center p-2 bg-light-primary dark:bg-highlight">
                            <Image
                              src={Drip}
                              alt="drip"
                              width={50}
                              height={50}
                              className="size-full"
                            />
                          </div>
                          <div className="flex-1 flex flex-col text-light-text dark:text-white hover:text-white">
                            <span className="w-full text-left font-semibold text-xs xl:text-sm overflow-hidden truncate">
                              {truncateString(service.name!, 20)}
                            </span>
                            <span className="w-full text-left text-[10px] text-wrap line-clamp-1">
                              {service.description}
                            </span>
                            <span className="w-full text-left font-semibold text-xs xl:text-sm overflow-hidden truncate">
                              AED&nbsp;{service.price_with_vat}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                  <div className="sticky bottom-0 left-0 w-full flex items-center justify-end pr-3 pb-3">
                    <Link
                      onClick={() => setShowMenu(false)}
                      href={getCategoryLink(list?.find(item=>item.id===String(category))?.name!)}
                      className="px-6 py-2 bg-accent text-white text-xs text-center"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className="relative h-full pl-3 md:pl-0 col-span-8 lg:col-span-9 xl:col-span-10 w-1/2 md:w-2/3 lg:w-3/4 flex items-center justify-center">
          <AutoComplete />
        </div>
      </div>
    </>
  );
};

export default Search;
