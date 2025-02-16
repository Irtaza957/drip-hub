"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaMinus, FaPlus } from "react-icons/fa6";

import { RootState } from "@/store";
import XIcon from "@/assets/icons/XIcon";
import AuthModal from "./modals/AuthModal";
import { calculateTotalCost } from "@/utils/helpers";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { addToCart, discardFromCart, removeFromCart } from "@/store/global";

const CheckoutBar = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [openCart, setOpenCart] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CART | null>(null);
  const { user, cart } = useSelector((state: RootState) => state.global);

  const pathnames = ["/bookings", "/drips", "/account-settings", "/checkout"];
  const dynamicPatterns = [/^\/bookings\/\d+$/, /^\/drips\/\d+$/];
  const shouldHide =
    pathnames.includes(pathname) ||
    dynamicPatterns.some((pattern) => pattern.test(pathname));

  const add = () => {
    if (selectedItem) {
      dispatch(
        addToCart({
          id: selectedItem?.id,
          name: selectedItem?.name,
          price: selectedItem?.price,
          discount: selectedItem?.discount,
          quantity: 1,
        })
      );
    }
  };

  const remove = () => {
    if (selectedItem) {
      dispatch(removeFromCart(selectedItem?.id));
    }
  };

  const discard = (id: number) => {
    dispatch(discardFromCart(id));
  };

  return (
    <>
      <AuthModal openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <div
        className={`fixed bottom-0 left-0 z-50 w-full ${
          openCart && "bg-black/50 backdrop-blur-sm h-full"
        } ${shouldHide ? "hidden" : "flex sm:hidden"} ${
          cart.length === 0 ? "hidden" : "flex"
        } flex-col items-end justify-end`}
      >
        <div className="w-full flex flex-col items-center justify-center bg-light-primary dark:bg-primary text-light-text dark:text-white">
          <div
            className={`w-full pt-3 px-5 ${
              openCart ? "flex" : "hidden"
            } items-center justify-between`}
          >
            <h1 className="w-full text-left text-[20px]">My Cart</h1>
            <button type="button" onClick={() => setOpenCart(false)}>
              <XIcon className="size-6 text-accent" />
            </button>
          </div>
          <div
            className={`w-full ${
              openCart ? "flex" : "hidden"
            } flex-col items-center justify-start px-5 divide-y divide-accent/50`}
          >
            {cart.map((item: CART, idx: number) => (
              <div
                key={idx}
                className="w-full flex flex-col items-center justify-center gap-3.5 py-5"
              >
                <div className="w-full flex items-center justify-center">
                  <span className="flex-1 text-left text-[16px] !leading-[18px] overflow-hidden truncate">
                    {item.name}
                  </span>
                  <button type="button" onClick={() => discard(item.id)}>
                    <XIcon className="text-accent" />
                  </button>
                </div>
                <div className="w-full flex items-end justify-end">
                  <div className="w-24 flex items-center justify-between border border-accent">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedItem(item);
                        remove();
                      }}
                      className="size-8 border-r border-accent p-2 text-light-text dark:text-white flex items-center justify-center"
                    >
                      <FaMinus className="size-full" />
                    </button>
                    <span className="flex-1 h-full text-center text-[18px] pt-[2px] pb-[2.5px] font-bold bg-accent text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedItem(item);
                        add();
                      }}
                      className="size-8 border-l border-accent p-2 text-light-text dark:text-white flex items-center justify-center"
                    >
                      <FaPlus className="size-full" />
                    </button>
                  </div>
                  <p className="flex-1 text-right text-base !leading-[16px]">
                    AED {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-light-primary dark:bg-primary p-5">
            <div className="w-full p-2 bg-accent text-white grid grid-cols-3">
              <div className="col-span-1 w-full flex flex-col items-center justify-center gap-1 text-sm pl-2">
                <span className="w-full text-left text-xs font-medium">
                  {cart.length}&nbsp;Item{cart.length > 1 && "s"}
                </span>
                <div
                  onClick={() => setOpenCart((prev) => (prev = !prev))}
                  className="w-full flex items-center justify-start space-x-2"
                >
                  <span className="text-left text-xs font-semibold">
                    AED&nbsp;
                    {new Intl.NumberFormat().format(calculateTotalCost(cart))}
                  </span>
                  <FaChevronDown
                    className={`w-3 h-3 ${
                      openCart && "rotate-180"
                    } transition-all duration-150 ease-linear`}
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  if (user) {
                    push("/checkout");
                  } else {
                    setOpenLogin((prev) => (prev = !prev));
                  }
                }}
                className="col-span-1 w-full flex items-center justify-center"
              >
                <span className="w-full text-xl text-center">
                  Checkout
                </span>
              </div>
              <div
                onClick={() => {
                  if (user) {
                    push("/checkout");
                  } else {
                    setOpenLogin((prev) => (prev = !prev));
                  }
                }}
                className="size-10 p-2.5 rounded-lg text-white col-span-1 flex items-center justify-center place-self-end"
              >
                <ArrowRightIcon className="size-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutBar;
