import Link from "next/link";
import { Transition } from "@headlessui/react";

import XIcon from "@/assets/icons/XIcon";

const CompareList = ({
  open,
  list,
  onClose,
  addToList,
}: {
  open: boolean;
  list: Set<string>;
  // eslint-disable-next-line no-unused-vars
  addToList: (item: string) => void;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const drips = [
    {
      id: 1,
      name: "Food Poisoning IV Drip",
    },
    {
      id: 2,
      name: "Energy Booster Drip",
    },
    {
      id: 3,
      name: "Pain Relief Drip",
    },
    {
      id: 4,
      name: "Health Drip",
    },
    {
      id: 5,
      name: "Dehydration Drip",
    },
  ];

  return (
    <Transition show={open}>
      <div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-secondary text-light-text dark:text-white sm:bg-black/30 sm:backdrop-blur-sm z-50 transition-all duration-150 ease-linear data-[closed]:opacity-0 flex items-center justify-center">
        <div className="w-full h-full botd sm:w-[80%] md:w-[65%] lg:w-[50%] xl:w-[35%] sm:h-[70%] mx-auto bg-white dark:bg-secondary text-light-text dark:text-white flex flex-col items-start justify-start space-y-5 px-5 pt-5 pb-[110px] sm:pb-5">
          <div className="w-full flex items-center justify-between">
            <h1 className="w-full text-left text-2xl">
              Add More Drips to Compare
            </h1>
            <button type="button" onClick={() => onClose(false)}>
              <XIcon className="size-6 text-accent" />
            </button>
          </div>
          <div className="w-full pb-[72px] overflow-auto flex sm:hidden flex-col items-start justify-start space-y-5 bg-light-primary dark:bg-primary p-5">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col items-start justify-start space-y-2.5"
              >
                <p className="w-full text-left">Energy Drips</p>
                {drips.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => addToList(d.name)}
                    className="w-full flex items-center justify-start space-x-5 cursor-pointer"
                  >
                    <div className="w-6 h-6 p-1 border border-accent">
                      <div
                        className={`w-full h-full ${
                          list.has(d.name) && "bg-accent"
                        }`}
                      />
                    </div>
                    <span>{d.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="w-full pb-[72px] overflow-auto sm:grid hidden grid-cols-2 gap-5 bg-light-primary dark:bg-primary p-5">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col items-start justify-start space-y-2.5"
              >
                <p className="w-full text-left">Energy Drips</p>
                {drips.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => addToList(d.name)}
                    className="w-full flex items-center justify-start space-x-5 cursor-pointer"
                  >
                    <div className="w-6 h-6 p-1 border border-accent">
                      <div
                        className={`w-full h-full ${
                          list.has(d.name) && "bg-accent"
                        }`}
                      />
                    </div>
                    <span>{d.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Link
            href="/compare"
            className="mx-auto py-2 px-6 text-lg bg-accent text-white text-center hidden sm:flex"
          >
            Compare
          </Link>
        </div>
        <div className="fixed z-30 bottom-0 left-0 w-full p-5 flex sm:hidden items-center justify-center bg-light-primary dark:bg-primary">
          <Link
            href="/compare"
            className="w-full pt-2 pb-2.5 text-[20px] bg-accent text-white text-center"
          >
            Compare
          </Link>
        </div>
      </div>
    </Transition>
  );
};

export default CompareList;
