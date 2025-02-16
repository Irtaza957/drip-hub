"use client";

import { RootState } from "@/store";

import { useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa6";
import { useBookingHistoryQuery } from "@/store/services/booking";
import Link from "next/link";

const BookingCard = ({ item }: { item: BOOKING_HISTORY }) => {
  return (
    <>
      <div className="w-full hidden sm:grid grid-cols-5 gap-5 p-5 items-center justify-center hover:bg-light-primary dark:hover:bg-tertiary">
        <p className="col-span-1 w-full text-left text-lg overflow-hidden truncate">
          Glutathione IV
        </p>
        <p className="col-span-1 w-full text-left text-gray-500 overflow-hidden truncate">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          alias.
        </p>
        <p className="col-span-1 w-full text-center text-lg">
          {item.reference}
        </p>
        <div className="flex flex-col items-center justify-center space-y-1 text-gray-500">
          <p className="w-full text-right">{item.schedule_date}</p>
          <p className="w-full text-right text-xs">{item.schedule_slot}</p>
        </div>
        <Link
          href={`/bookings/${item.booking_id}`}
          className="w-2/3 pt-2 pb-2.5 bg-accent text-white ml-auto text-center"
        >
          Edit
        </Link>
      </div>
      <div className="w-full border-b border-accent/50 flex sm:hidden items-center justify-between pb-5">
        <div className="flex flex-col items-center justify-center space-y-1">
          <p>Glutathione IV</p>
          <p className="w-full text-left text-xs text-gray-500">
            Total: {item.total_services} Items
          </p>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <div className="flex flex-col items-center justify-center space-y-1">
            <p className="w-full text-right">{item.reference}</p>
            <p className="w-full text-right text-xs text-gray-500">
              {item.schedule_date}
            </p>
          </div>
          <Link href={`/bookings/${item.booking_id}`}>
            <FaChevronRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </div>
    </>
  );
};

const Bookings = () => {
  const [tab, setTab] = useState("up");
  const { user } = useSelector((state: RootState) => state.global);
  const { data } = useBookingHistoryQuery(user?.token);

  return (
    <div className="w-full bg-light-primary dark:bg-secondary text-light-text dark:text-white flex flex-col items-center justify-center space-y-5 pt-[75px] sm:pt-[95px] pb-80 3xl:pb-[800px] p-5 md:px-0">
      <h1 className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto text-left text-[22px] sm:text-2xl sm:font-light">
        My Bookings
      </h1>
      <div className="w-full flex sm:hidden flex-col items-start justify-start p-2.5 bg-white dark:bg-primary">
        <div className="w-full grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setTab("up")}
            className={`w-full py-3 ${
              tab === "up"
                ? "bg-accent text-white"
                : "bg-light-primary dark:bg-tertiary text-light-text dark:text-white"
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setTab("com")}
            className={`w-full py-3 ${
              tab === "com"
                ? "bg-accent text-white"
                : "bg-light-primary dark:bg-tertiary text-light-text dark:text-white"
            }`}
          >
            Completed
          </button>
          <button
            type="button"
            onClick={() => setTab("can")}
            className={`w-full py-3 ${
              tab === "can"
                ? "bg-accent text-white"
                : "bg-light-primary dark:bg-tertiary text-light-text dark:text-white"
            }`}
          >
            Cancelled
          </button>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-3 p-5">
          {tab === "up" &&
            data
              ?.filter(
                (booking) =>
                  booking.booking_status !== "Completed" &&
                  booking.booking_status !== "Cancelled"
              )
              .map((booking) => (
                <BookingCard key={booking.booking_id} item={booking} />
              ))}
          {tab === "com" &&
            data
              ?.filter((booking) => booking.booking_status === "Completed")
              .map((booking) => (
                <BookingCard key={booking.booking_id} item={booking} />
              ))}
          {tab === "can" &&
            data
              ?.filter((booking) => booking.booking_status === "Cancelled")
              .map((booking) => (
                <BookingCard key={booking.booking_id} item={booking} />
              ))}
        </div>
      </div>
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto hidden sm:grid grid-cols-4 bg-white dark:bg-primary">
        <div className="col-span-1 w-full flex flex-col items-start justify-start space-y-5 p-5 border-r border-accent/50">
          <button
            type="button"
            onClick={() => setTab("up")}
            className={`w-full py-3 ${
              tab === "up" ? "bg-accent text-white" : "bg-light-primary dark:bg-tertiary"
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setTab("com")}
            className={`w-full py-3 ${
              tab === "com" ? "bg-accent text-white" : "bg-light-primary dark:bg-tertiary"
            }`}
          >
            Completed
          </button>
          <button
            type="button"
            onClick={() => setTab("can")}
            className={`w-full py-3 ${
              tab === "can" ? "bg-accent text-white" : "bg-light-primary dark:bg-tertiary"
            }`}
          >
            Cancelled
          </button>
        </div>
        <div className="col-span-3 w-full max-h-[500px] overflow-auto flex flex-col items-start justify-start divide-y divide-accent/50">
          {tab === "up" &&
            data
              ?.filter(
                (booking) =>
                  booking.booking_status !== "Completed" &&
                  booking.booking_status !== "Cancelled"
              )
              .map((booking) => (
                <BookingCard key={booking.booking_id} item={booking} />
              ))}
          {tab === "com" &&
            data
              ?.filter((booking) => booking.booking_status === "Completed")
              .map((booking) => (
                <BookingCard key={booking.booking_id} item={booking} />
              ))}
          {tab === "can" &&
            data
              ?.filter((booking) => booking.booking_status === "Cancelled")
              .map((booking) => (
                <BookingCard key={booking.booking_id} item={booking} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
