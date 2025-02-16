import Link from "next/link";
import Image from "next/image";
import debounce from "lodash.debounce";
import { LuLoader2 } from "react-icons/lu";
import { useCallback, useEffect, useRef, useState } from "react";

import Drip from "@/assets/img/drip.svg";
import { truncateString } from "@/utils/helpers";
import MagnifierIcon from "@/assets/icons/MagnifierIcon";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useFetchServicesListMutation } from "@/store/services/service";

const AutoComplete = ({ trigger }: { trigger?: () => void }) => {
  const dropRef = useRef(null);
  const [query, setQuery] = useState("");
  useOnClickOutside(dropRef, () => setQuery(""));
  const [results, setResults] = useState<DRIP_CARD[] | undefined>([]);
  const [searchServices, { isLoading }] = useFetchServicesListMutation();

  const debouncedFetchData = useCallback(
    debounce(async (value) => {
      if (value) {
        try {
          const data = await searchServices({});
          setResults(data?.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }, 1000),
    [query]
  );

  useEffect(() => {
    debouncedFetchData(query);
    return () => {
      debouncedFetchData.cancel();
    };
  }, [query, debouncedFetchData]);

  return (
    <div className="w-full relative flex flex-col items-center justify-center">
      <div className="w-full sm:flex hidden items-center justify-center">
        <input
          type="text"
          value={query}
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          className="pl-3 py-2 w-full bg-transparent placeholder:text-sm placeholder:text-[#8E8E8E] font-medium text-xs text-[#8E8E8E]"
        />
        <MagnifierIcon
          borderColor="#8E8E8E"
          className="size-5 mr-3 text-transparent"
        />
      </div>
      <div className="w-full bg-light-primary dark:bg-white/30 flex sm:hidden items-center justify-center gap-5 p-3 text-xs">
        <MagnifierIcon className="size-6 text-light-text dark:text-white/70" />
        <input
          type="text"
          value={query}
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          className="placeholder:dark:text-white/70 placeholder:text-light-text text-light-text dark:text-white bg-transparent w-full font-light text-sm"
        />
      </div>
      <div
        ref={dropRef}
        className={`absolute mt-2.5 sm:mt-0 top-12 sm:top-10 z-10 left-0 sm:border sm:border-accent/50 w-full lg:w-1/2 max-h-[450px] sm:max-h-[300px] grid-cols-1 items-start justify-start overflow-auto custom-scrollbar bg-white dark:bg-primary text-light-text dark:text-white ${
          query === "" ? "hidden" : "grid"
        } ${
          results?.length === 0 || isLoading
            ? "items-center justify-center"
            : "items-start justify-start"
        }`}
      >
        {results?.length === 0 || isLoading ? (
          <div className="w-full col-span-1 md:col-span-2 flex items-center justify-center p-5">
            <LuLoader2 className="w-10 h-10 animate-spin text-accent" />
          </div>
        ) : results?.filter((result) =>
            result.name?.toLowerCase().includes(query.toLowerCase())
          ).length === 0 ? (
          <div className="w-full col-span-1 md:col-span-2 h-full flex items-center justify-center text-sm font-semibold p-5">
            No Results
          </div>
        ) : (
          results
            ?.filter((result) =>
              result.name?.toLowerCase().includes(query.toLowerCase())
            )
            .map((result, idx) => (
              <Link
                key={idx}
                onClick={() => {
                  setQuery("");
                  if (trigger) {
                    trigger();
                  }
                }}
                href={`/drips/${result.service_id}`}
                className="flex items-center justify-center gap-5 py-2.5 sm:p-3.5 hover:bg-accent group"
              >
                <div className="size-14 flex items-center justify-center p-2 bg-light-primary dark:bg-highlight group-hover:bg-accent">
                  <Image
                    src={Drip}
                    alt="drip"
                    width={50}
                    height={50}
                    className="size-full"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="w-full text-left font-regular sm:font-semibold text-sm overflow-hidden truncate">
                    {truncateString(result.name!, 20)}
                  </span>
                  <span className="w-full text-left text-xs text-wrap line-clamp-1 font-light sm:font-normal">
                    {result.description}
                  </span>
                  <span className="w-full text-left font-regular sm:font-semibold text-sm overflow-hidden truncate">
                    AED&nbsp;{result.price_with_vat}
                  </span>
                </div>
              </Link>
            ))
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
