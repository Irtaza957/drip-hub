import { PiMountainsFill } from "react-icons/pi";

const HeaderSkeleton = () => {
  return (
    <div className="w-full h-[150px] sm:h-[300px] xl:h-[700px] object-cover bg-white dark:bg-highlight flex flex-col items-end justify-end animate-pulse">
      <div className="w-full h-full flex items-center justify-center">
        <PiMountainsFill className="w-24 h-24 text-light-primary dark:text-primary animate-pulse" />
      </div>
      <div className="w-full flex items-center justify-center space-x-3 pb-4 xl:pb-10">
        <div className="w-2.5 xl:w-5 h-2.5 xl:h-5 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
        <div className="w-2.5 xl:w-5 h-2.5 xl:h-5 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
        <div className="w-2.5 xl:w-5 h-2.5 xl:h-5 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
        <div className="w-2.5 xl:w-5 h-2.5 xl:h-5 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
        <div className="w-2.5 xl:w-5 h-2.5 xl:h-5 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
      </div>
    </div>
  );
};

export default HeaderSkeleton;
