"use client";

import Header from "@/components/Header";
import CompareList from "@/components/CompareList";

import { useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsCart3, BsDroplet } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Compare = () => {
  const [compare, setCompare] = useState(false);
  const [list, setList] = useState<Set<string>>(new Set<string>());

  const addToList = (item: string) => {
    if (list.has(item)) {
      setList((prevList) => {
        const newList = new Set(prevList);
        newList.delete(item);
        return newList;
      });
    } else {
      setList((prevList) => new Set(prevList).add(item));
    }
  };

  return (
    <div className="w-full bg-light-primary dark:bg-secondary text-light-text dark:text-white">
      <div className="w-full flex flex-col items-start justify-start">
        <Header />
        <div className="w-full xl:w-[60%] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-5 p-5">
          <h1 className="col-span-1 xl:col-span-3 w-full text-2xl text-left">
            Energy Drips
          </h1>
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="w-full flex flex-col items-center justify-center border border-accent"
            >
              <h1 className="w-full text-center pt-1 pb-1.5 bg-accent text-white">
                Express Immune Booster
              </h1>
              <div className="w-full grid grid-cols-2 gap-5 p-3 bg-white dark:bg-primary">
                <div className="col-span-2 w-full grid grid-cols-3">
                  <div className="col-span-1 w-full flex items-center justify-center space-x-1.5">
                    <FaMoneyBillWave className="w-4 h-4 text-accent" />
                    <span>AED 299</span>
                  </div>
                  <div className="col-span-1 w-full flex items-center justify-center space-x-1.5">
                    <BsDroplet className="w-4 h-4 text-accent" />
                    <span>250 ml</span>
                  </div>
                  <div className="col-span-1 w-full flex items-center justify-center space-x-1.5">
                    <FaRegClock className="w-4 h-4 text-accent" />
                    <span>30 Mins</span>
                  </div>
                </div>
                <div className="col-span-1 w-full flex flex-col items-start justify-between list-inside list-disc marker:text-accent">
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                  </div>
                </div>
                <div className="col-span-1 w-full flex flex-col items-start justify-between list-inside list-disc marker:text-accent">
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5 text-gray-500">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-gray-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5 text-gray-500">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-gray-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5 text-gray-500">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-gray-500 w-5 h-5" />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="w-2 h-2 bg-accent mt-1" />
                    <span className="w-full text-left font-light pl-1.5 text-gray-500">
                      B2 (riboflavin)
                    </span>
                    <IoIosCheckmarkCircle className="text-gray-500 w-5 h-5" />
                  </div>
                </div>
                <div className="col-span-2 w-full flex items-center justify-center">
                  <button className="w-1/3 py-2 border border-accent flex items-center justify-center">
                    <BsCart3 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="col-span-1 xl:col-span-3 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setCompare(true)}
              className="w-full xl:w-auto xl:px-20 pt-2.5 pb-3 bg-accent text-white font-medium"
            >
              Add More Drips to Compare
            </button>
          </div>
        </div>
      </div>
      <CompareList
        list={list}
        open={compare}
        onClose={setCompare}
        addToList={addToList}
      />
    </div>
  );
};

export default Compare;
