import { RootState } from "@/store";
import XIcon from "@/assets/icons/XIcon";
import Drip from "@/assets/img/drip.svg";
import AuthModal from "../modals/AuthModal";
import EmptyCart from "@/assets/img/empty-cart.svg";
import { calculateTotalCost } from "@/utils/helpers";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { addToCart, toggleSidebar, removeFromCart } from "@/store/global";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const cartRef = useRef(null);
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = useState(false);
  const { cart, sidebarToggle } = useSelector(
    (state: RootState) => state.global
  );
  const [selectedItem, setSelectedItem] = useState<CART | null>(null);

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

  const closeBar = () => {
    if (sidebarToggle) {
      dispatch(toggleSidebar());
    }
  };

  useOnClickOutside(cartRef, closeBar);

  return (
    <>
      <AuthModal openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <div
        className={`w-full h-full transition-[width] fixed top-0 left-0 z-50 bg-black/30 ${
          !sidebarToggle && "hidden"
        }`}
      />
      <div
        ref={cartRef}
        className={`${
          sidebarToggle ? "w-[350px] xl:w-[400px]" : "w-0"
        } transition-all duration-150 ease-linear h-full overflow-auto custom-scrollbar fixed top-0 right-0 z-50 flex flex-col items-start justify-start bg-white dark:bg-primary shadow-2xl text-light-text dark:text-white`}
      >
        <div className="w-full flex items-center justify-center bg-light-primary dark:bg-secondary text-accent py-5 px-5 border-b border-light-primary dark:border-highlight">
          <h1 className="w-full text-left text-xl font-semibold">
            My Cart&nbsp;
            <span className="text-base font-medium">
              ( {cart.length} Items )
            </span>
          </h1>
          <button type="button" onClick={closeBar}>
            <XIcon className="size-5" />
          </button>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-start overflow-auto custom-scrollbar px-5 pb-5 pt-2">
          {cart.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-10 lg:p-5">
              <Image
                src={EmptyCart}
                alt="empty-wishlist"
                className="size-36 lg:size-44"
              />
              <p className="w-full text-center text-[26px] text-accent font-semibold mb-2">
                Your Cart is Empty!!
              </p>
              <p className="w-full text-center font-semibold text-[16px]">
                Explore more and shortlist<br />some services
              </p>
            </div>
          ) : (
            cart.map((item: CART, idx: number) => (
              <div
                key={idx}
                className="w-full flex items-center justify-between space-x-2 py-4 border-b border-accent/50 dark:border-highlight"
              >
                <div className="size-14 bg-light-primary dark:bg-secondary p-2 rounded-full">
                  <Image
                    src={Drip}
                    alt="drip"
                    width={500}
                    height={500}
                    className="size-full"
                  />
                </div>
                <div className="flex w-6/12 flex-col items-center justify-center space-y-0.5">
                  <span className="w-full text-left text-sm font-semibold overflow-hidden truncate">
                    {item.name}
                  </span>
                  <span className="w-full text-left text-xs  font-medium">
                    Qty: {item.quantity}
                  </span>
                  <span className="w-full text-left text-xs  font-medium">
                    AED {item.price}
                  </span>
                </div>
                <div className="w-3/12 h-full flex items-center justify-end space-x-2.5 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedItem(item);
                      remove();
                    }}
                    className="border border-accent p-0.5 w-6 h-6 flex items-center justify-center"
                  >
                    <FaMinus className="w-3 h-3" />
                  </button>
                  <span className="font-bold text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedItem(item);
                      add();
                    }}
                    className="bg-accent text-white p-0.5 w-6 h-6 flex items-center justify-center"
                  >
                    <FaPlus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="w-full flex flex-col items-center justify-center pb-[85px] px-5 space-y-1">
            <div className="w-full text-sm flex items-center justify-between font-medium">
              <span>Sub Total</span>
              <span>
                AED&nbsp;
                {new Intl.NumberFormat().format(calculateTotalCost(cart))}
              </span>
            </div>
            <div className="w-full text-sm flex items-center justify-between font-medium">
              <span>Discount</span>
              <span>AED 0.00</span>
            </div>
            <div className="w-full text-sm flex items-center justify-between font-bold">
              <span>Grand Total</span>
              <span>
                AED&nbsp;
                {new Intl.NumberFormat().format(calculateTotalCost(cart))}
              </span>
            </div>
          </div>
        )}
        <div className="absolute bottom-0 left-0 z-10 w-full grid grid-cols-2 gap-1.5 px-5 pb-3 pt-4 bg-white dark:bg-secondary border-t border-light-primary dark:border-highlight">
          <button
            onClick={closeBar}
            className={`${
              cart.length === 0 ? "col-span-2" : "col-span-1"
            } w-full bg-light-primary dark:bg-highlight text-xs font-bold py-3 place-self-end`}
          >
            Continue Shopping
          </button>
          {cart.length > 0 && (
            <Link
              href="/cart"
              onClick={closeBar}
              className="col-span-1 w-full bg-accent text-center text-white text-xs font-bold py-3 place-self-end"
            >
              Checkout
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
