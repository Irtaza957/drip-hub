import React from "react";
import { PiMountainsFill } from "react-icons/pi";

const CategorySkeletion = () => {
  return (
    <div className="w-full h-full py-5 px-8 bg-white dark:bg-highlight animate-pulse flex flex-col items-center justify-center space-y-3">
      <PiMountainsFill className="w-12 h-12 text-light-primary dark:text-primary animate-pulse" />
      <div className="w-full flex flex-col items-center justify-center space-y-1">
        <div className="w-1/2 h-1.5 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
        <div className="w-2/3 h-1.5 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
        <div className="w-1/2 h-1.5 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
      </div>
    </div>
  );
};

export default CategorySkeletion;
