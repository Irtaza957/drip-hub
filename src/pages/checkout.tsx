"use client";

import {
  generateDates,
  generateTimeSlots,
  calculateTotalCost,
  convertToDateString,
} from "@/utils/helpers";
import { RootState } from "@/store";
import BellIcon from "@/assets/icons/BellIcon";
import CardIcon from "@/assets/icons/CardIcon";
import DateModal from "@/components/modals/DateModal";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import SlotsModal from "@/components/modals/SlotsModal";
import DateDrawer from "@/components/drawers/DateDrawer";
import SlotsDrawer from "@/components/drawers/SlotsDrawer";
import AddressModal from "@/components/modals/AddressModal";
import SuccessModal from "@/components/modals/SuccessModal";
import LocationIconTwo from "@/assets/icons/LocationIconTwo";
import AddressDrawer from "@/components/drawers/AddressDrawer";
import DollarCircleIcon from "@/assets/icons/DollarCircleIcon";
import { useFetchAddressesQuery } from "@/store/services/address";
import { usePostBookingMutation } from "@/store/services/booking";
import ArrowRightLongIcon from "@/assets/icons/ArrowRightLongIcon";

import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { FaRegClock, FaCheckCircle } from "react-icons/fa";
import { clearCart } from "@/store/global";

const Checkout = () => {
  const d = generateDates(15);
  const slots = generateTimeSlots(convertToDateString(d[1]));

  const [done, setDone] = useState(false);
  const [address, setAddress] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState<string[]>([]);
  const [method, setMethod] = useState("Credit Card");
  const [addtionalInfo, setAddtionalInfo] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(slots[0]);
  const [postBooking, { isLoading }] = usePostBookingMutation();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [openTime, setOpenTime] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openAddressDrawer, setOpenAddressDrawer] = useState(false);
  const dispatch = useDispatch();

  const { user, cart } = useSelector((state: RootState) => state.global);
  const { data } = useFetchAddressesQuery({
    id: user?.customer_id,
    token: user?.token,
  });

  const handleErrors = () => {
    const errorlist = [];
    if (!date || date === undefined) errorlist.push("date");
    if (!address || address === "") errorlist.push("address");
    if (!selectedSlot || selectedSlot === "") errorlist.push("slot");

    setErrors(errorlist);
    return errorlist.length === 0;
  };

  const handleSubmit = async () => {
    const noErrors = handleErrors();

    if (!noErrors) {
      toast.error("Please Fill Required Fields");
      return;
    }

    const urlencoded = new URLSearchParams();
    urlencoded.append("customer_id", user?.customer_id!);
    urlencoded.append("address_id", address);
    urlencoded.append("family_member_id", "N/A");
    urlencoded.append("firstname", user?.firstname!);
    urlencoded.append("lastname", user?.lastname!);
    urlencoded.append("phone", user?.phone!);
    urlencoded.append("schedule_date", dayjs(date).format("YYYY-MM-DD"));
    urlencoded.append("schedule_slot", selectedSlot);
    urlencoded.append("delivery_notes", addtionalInfo);
    urlencoded.append("payment_method", method);
    urlencoded.append(
      "payment_method_code",
      method === "Online Payment"
        ? "pol"
        : method === "Cash on Delivery"
        ? "cod"
        : "cdd"
    );
    urlencoded.append("payment_status", "pending");
    urlencoded.append("sub_total", `${calculateTotalCost(cart)}`);
    urlencoded.append("discount_value", "0.00");
    urlencoded.append("total", `${calculateTotalCost(cart)}`);
    urlencoded.append(
      "services",
      JSON.stringify(
        cart.map((item: CART) => ({
          service_id: item.id,
          qty: item.quantity,
          price: item.price,
        }))
      )
    );
    urlencoded.append("coupon_id", "0");

    try {
      const data = await postBooking({
        data: urlencoded,
        token: user?.token!,
      });

      if (data.error) {
        toast.error("Please Try Again!");
      } else {
        setDone(true);
        dispatch(clearCart());
      }
    } catch (err) {
      toast.error("Please Try Again!");
    }
  };

  useEffect(() => {
    if (data) {
      setAddress(data[0]?.address_id!);
    }
  }, [data]);

  return (
    <div className="w-full bg-light-primary dark:bg-secondary text-light-text dark:text-white">
      <SlotsDrawer
        slots={slots}
        open={openTime}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        onClose={() => setOpenTime(false)}
      />
      <DateDrawer
        date={date}
        open={openDate}
        setDate={setDate}
        onClose={() => setOpenDate(false)}
      />
      <AddressDrawer
        value={address}
        addresses={data!}
        setter={setAddress}
        open={openAddressDrawer}
        onClose={() => setOpenAddressDrawer(false)}
      />
      <SlotsModal
        slots={slots}
        open={openTimeModal}
        setOpen={setOpenTimeModal}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
      />
      <DateModal
        date={date}
        setDate={setDate}
        open={openDateModal}
        setOpen={setOpenDateModal}
        shouldDisablePastDates={true}
      />
      <AddressModal
        value={address}
        addresses={data!}
        open={openAddress}
        setter={setAddress}
        setOpen={setOpenAddress}
      />
      <SuccessModal open={done} setOpen={setDone} />
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto px-5 md:px-0 py-7 sm:pt-14 sm:pb-24 3xl:pb-[600px] flex flex-col items-center justify-center gap-5">
        <h1 className="w-full mx-auto text-left text-xl sm:text-[42px] mt-[60px] sm:mt-[80px]">
          Almost There!
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 w-full flex flex-col items-start justify-start gap-5 sm:bg-white sm:dark:bg-[#0F162A]/80 p-0 sm:p-5">
            <div className="w-full p-3 flex flex-col items-center justify-center bg-light-primary dark:bg-[#0F162A] border border-accent/20">
              <div className="w-full flex items-start justify-between">
                <p className="w-full text-left text-[18px]">Pick a Date</p>
                <button
                  type="button"
                  onClick={() => setOpenDate(true)}
                  className="px-4 pt-1.5 pb-2 bg-white dark:bg-secondary text-accent text-[14px] flex sm:hidden"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => setOpenDateModal(true)}
                  className="px-4 pt-1.5 pb-2 bg-white dark:bg-secondary text-accent text-[14px] hidden sm:flex"
                >
                  Change
                </button>
              </div>
              <div className="w-full flex items-center justify-start space-x-2.5">
                <CalendarIcon className="size-4 text-accent" />
                <p className="w-full text-left text-xs font-medium">
                  {dayjs(date).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
            <div className="w-full p-3 flex flex-col items-center justify-center bg-light-primary dark:bg-[#0F162A] border border-accent/20">
              <div className="w-full flex items-start justify-between">
                <p className="w-full text-left text-[18px]">Pick a Slot</p>
                <button
                  type="button"
                  onClick={() => setOpenTime(true)}
                  className="px-4 pt-1.5 pb-2 bg-white dark:bg-secondary text-accent text-[14px] flex sm:hidden"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => setOpenTimeModal(true)}
                  className="px-4 pt-1.5 pb-2 bg-white dark:bg-secondary text-accent text-[14px] hidden sm:flex"
                >
                  Change
                </button>
              </div>
              <div className="w-full flex items-center justify-start space-x-2.5">
                <FaRegClock className="w-5 h-5 text-accent" />
                <p className="w-full text-left text-xs">{selectedSlot}</p>
              </div>
            </div>
            <div className="w-full p-3 flex flex-col items-center justify-center bg-light-primary dark:bg-[#0F162A] border border-accent/20">
              <div className="w-full flex items-start justify-between">
                <p className="w-full text-left text-[18px]">Pick an Address</p>
                <button
                  type="button"
                  onClick={() => setOpenAddressDrawer(true)}
                  className="px-4 pt-1.5 pb-2 bg-white dark:bg-secondary text-accent text-[14px] flex sm:hidden"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => setOpenAddress(true)}
                  className="px-4 pt-1.5 pb-2 bg-white dark:bg-secondary text-accent text-[14px] sm:flex hidden"
                >
                  Change
                </button>
              </div>
              <div className="w-full flex items-center justify-start space-x-2.5">
                <LocationIconTwo
                  borderColor="transparent"
                  className="size-5 text-accent"
                />
                <p className="w-full text-left text-[14px]">
                  {
                    data?.filter((a) => a.address_id === address)[0]
                      ?.address_type
                  }
                </p>
              </div>
              <p className="pl-7 w-full text-left text-[14px] font-extralight">
                {data?.filter((a) => a.address_id === address)[0]?.apartment &&
                  data?.filter((a) => a.address_id === address)[0]?.apartment}
                ,&nbsp;
                {data?.filter((a) => a.address_id === address)[0]
                  ?.building_no &&
                  data?.filter((a) => a.address_id === address)[0]?.building_no}
                ,&nbsp;
                {data?.filter((a) => a.address_id === address)[0]?.area &&
                  data?.filter((a) => a.address_id === address)[0]?.area}
              </p>
            </div>
            <div className="w-full p-3 flex items-center justify-between gap-3 bg-light-primary dark:bg-[#0F162A] border border-accent/20">
              <BellIcon
                borderColor="transparent"
                className="size-5 text-accent"
              />
              <p className="w-full text-left text-[14px] font-light">
                *IV Drip receivers must be over 18 and can&apos;t be pregnant.
              </p>
            </div>
          </div>
          <div className="col-span-1 w-full flex flex-col items-start justify-start gap-5 p-5 bg-white dark:bg-primary border border-accent/20">
            <div className="w-full flex flex-col items-center justify-center gap-3.5">
              <p className="w-full text-left text-2xl">Additional Info</p>
              <textarea
                rows={3}
                value={addtionalInfo}
                onChange={(e) => setAddtionalInfo(e.target.value)}
                className="w-full p-2.5 bg-light-primary dark:bg-secondary border border-accent/20"
              />
              <p className="w-full text-left text-2xl">Payment Method</p>
              <div className="w-full flex flex-col items-center justify-center">
                <div
                  onClick={() => setMethod("Credit Card")}
                  className={`w-full p-2.5 ${
                    method === "Credit Card" &&
                    "bg-light-primary dark:bg-secondary border border-accent/20"
                  } flex items-center justify-center space-x-2.5 cursor-pointer`}
                >
                  <CardIcon className="size-5 text-accent" />
                  <div className="w-full flex items-center justify-between">
                    <p className="w-full text-left text-base sm:text-xs md:text-[18px]">
                      Credit Card
                    </p>
                    {method === "Credit Card" && (
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                <div
                  onClick={() => setMethod("Cash on Delivery")}
                  className={`w-full p-2.5 ${
                    method === "Cash on Delivery" &&
                    "bg-light-primary dark:bg-secondary border border-accent/20"
                  } flex items-center justify-center space-x-2.5 cursor-pointer`}
                >
                  <DollarCircleIcon
                    borderColor="transparent"
                    className="size-5 text-accent"
                  />
                  <div className="w-full flex items-center justify-between">
                    <p className="w-full text-left text-base sm:text-xs md:text-[18px]">
                      Cash on Delivery
                    </p>
                    {method === "Cash on Delivery" && (
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                <div
                  onClick={() => setMethod("Card on Delivery")}
                  className={`w-full p-2.5 ${
                    method === "Card on Delivery" &&
                    "bg-light-primary dark:bg-secondary border border-accent/20"
                  } flex items-center justify-center space-x-2.5 cursor-pointer`}
                >
                  <CardIcon className="size-5 text-accent" />
                  <div className="w-full flex items-center justify-between">
                    <p className="w-full text-left text-base sm:text-xs md:text-[18px]">
                      Card on Delivery
                    </p>
                    {method === "Card on Delivery" && (
                      <FaCheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-1.5">
              <div className="w-full flex items-center justify-between text-sm md:text-[18px]">
                <p>Subtotal</p>
                <p>
                  AED {new Intl.NumberFormat().format(calculateTotalCost(cart))}
                </p>
              </div>
              <div className="w-full flex items-center justify-between text-sm md:text-[18px] pb-2.5">
                <p>VAT</p>
                <p>AED 0.00</p>
              </div>
              <div className="w-full flex items-center justify-between text-lg md:text-xl pt-2.5 border-t border-accent/50">
                <p>Grand Total</p>
                <p>
                  AED {new Intl.NumberFormat().format(calculateTotalCost(cart))}
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 pt-1.5 pb-2 text-[20px] hidden sm:flex items-center justify-between bg-accent text-white"
            >
              {isLoading ? (
                <>
                  <LuLoader2 className="size-5 animate-spin" />
                  <p className="w-full text-center">Please Wait...</p>
                </>
              ) : (
                <>
                  <p className="w-full text-center">Place Order</p>
                  <ArrowRightLongIcon className="size-5" />
                </>
              )}
            </button>
            <div className="fixed z-30 bottom-0 left-0 flex sm:hidden w-full p-5 items-center justify-center bg-light-primary dark:bg-primary">
              <button
                type="submit"
                className="w-full pt-2 pb-2.5 px-5 flex items-center justify-between bg-accent text-white"
              >
                {isLoading ? (
                  <>
                    <LuLoader2 className="size-5 animate-spin" />
                    <p className="w-full text-center text-[20px]">
                      Please Wait...
                    </p>
                  </>
                ) : (
                  <>
                    <p className="w-full text-center text-[20px]">
                      Place Order
                    </p>
                    <ArrowRightLongIcon className="size-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
