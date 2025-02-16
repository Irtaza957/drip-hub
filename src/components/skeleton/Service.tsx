import { PiMountainsFill } from "react-icons/pi";

const ServiceSkeleton = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 xl:grid-cols-5 gap-2.5 bg-white dark:bg-highlight animate-pulse">
      <div className="col-span-1 xl:col-span-2 w-full h-full rounded-l-2xl flex items-center justify-center">
        <PiMountainsFill className="w-24 h-24 text-light-primary dark:text-primary animate-pulse" />
      </div>
      <div className="col-span-3 w-full h-full rounded-r-2xl p-4 flex flex-col items-start justify-start space-y-2.5">
        <div className="w-full h-6 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
        <div className="w-1/2 h-3 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
        <div className="w-2/3 h-3 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
        <div className="w-1/4 h-3 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
        <div className="w-1/6 h-3 rounded-full bg-light-primary dark:bg-primary animate-pulse place-self-start" />
        <div className="w-full flex items-center justify-between animate-pulse">
          <div className="w-full flex flex-col items-start justify-start space-y-2.5">
            <div className="w-1/6 h-3 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
            <div className="w-1/6 h-3 rounded-full bg-light-primary dark:bg-primary animate-pulse" />
          </div>
          <div className="w-1/4 h-12 rounded-lg bg-light-primary dark:bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ServiceSkeleton;
