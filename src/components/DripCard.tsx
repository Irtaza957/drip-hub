"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import AuthModal from "./modals/AuthModal";
import DripImage from "@/assets/img/drip.svg";
import HeartIcon from "@/assets/icons/HeartIcon";
import ClockIcon from "@/assets/icons/ClockIcon";
import ChoiceTag from "@/assets/img/choice-tag.svg";
import DropletIcon from "@/assets/icons/DropletIcon";
import CartTwoIcon from "@/assets/icons/CartTwoIcon";
import BundleDrips from "@/assets/img/header-drips.svg";
import { useAddToWishlistMutation } from "@/store/services/wishlist";
import { addToCart, removeFromCart, setCart, toggleSidebar } from "@/store/global";

const DripCard = ({
  tag,
  item,
  bundle,
  navLink
}: {
  tag?: string;
  item: DRIP_CARD;
  bundle?: boolean;
  navLink?: string 
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [addToWishlist] = useAddToWishlistMutation();
  const { user, cart } = useSelector((state: RootState) => state.global);

  const handleDecrement = () => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const add = (id: number, name: string, price: number, discount: number, price_without_vat: number, isQuantity: boolean = false) => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        discount,
        quantity: isQuantity ? quantity + 1 : 1,
        price_without_vat,
      })
    );
  };

  const remove = (item: DRIP_CARD) => {
    if (item) {
      if (Number(quantity) === 1) {
        dispatch(removeFromCart(Number(item.service_id)));
      } else {
        const updatedCart = cart.map(i => i.id === Number(item.service_id) ? { ...i, quantity: i.quantity - 1 } : i);
        dispatch(setCart(updatedCart));
      }
    }
  };

  const like = async (id: string) => {
    setWishlist((prev) => (prev = !prev));

    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append("customer_id", user?.customer_id!);
      urlencoded.append("service_id", id);

      const response = await addToWishlist({
        data: urlencoded,
        token: user?.token,
      });

      if (response.error) {
        // @ts-ignore
        toast.error(response.error.data.error);
      } else {
        if (wishlist) {
          setWishlist(false);
        } else {
          setWishlist(true);
        }
      }
    } catch (error) {
      toast.error("Please Try Again!");
    }
  };

  useEffect(() => {
    if (cart) {
      const exists = cart.find((data: CART) => data.name === item?.name!);
      if (exists) {
        setQuantity(exists.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [cart]);

  useEffect(() => {
    if (item) {
      if (item.wishlist_id) {
        setWishlist(true);
      }
    }
  }, [item]);

  return (
    <>
      <AuthModal openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <div className="grid grid-cols-6 bg-white dark:bg-primary border border-light-primary dark:border-border p-1.5">
        {tag === "choice" ? (
          <Link
            href={navLink || `/drips/${item.service_id}`}
            className="relative col-span-2 p-2.5 w-full flex items-center justify-center bg-light-primary dark:bg-secondary"
          >
            <Image priority alt="card" width={42} height={84} src={DripImage} />
            <Image
              priority
              alt="card"
              width={42}
              height={84}
              src={ChoiceTag}
              className="absolute bottom-2 w-20"
            />
          </Link>
        ) : tag === "best" ? (
          <Link
            href={navLink || `/drips/${item.service_id}`}
            className="relative col-span-2 p-2.5 w-full flex flex-col items-center justify-center bg-light-primary dark:bg-tertiary"
          >
            <Image priority alt="card" width={42} height={84} src={DripImage} />
            <p className="text-white bg-[#6B54FA] text-[10px] px-1 py-0.5 italic">
              Best Selling
            </p>
          </Link>
        ) : (
          <Link
            href={navLink || `/drips/${item.service_id}`}
            className="col-span-2 p-2.5 w-full flex items-center justify-center bg-light-primary dark:bg-tertiary"
          >
            <Image
              priority
              alt="card"
              width={42}
              height={84}
              src={bundle ? BundleDrips : DripImage}
              className={`${bundle && "w-full h-full"}`}
            />
          </Link>
        )}
        <div className="col-span-4 w-full pl-3 flex flex-col items-start text-light-text dark:text-white">
          <div className="w-full flex items-start justify-between">
            <div className="w-full flex flex-col items-center justify-center px-1.5 py-1">
              <div className="w-full flex items-end justify-center">
                <Link
                  href={navLink || `/drips/${item.service_id}`}
                  className="flex-1 text-[16px] sm:text-[22px] text-left font-normal"
                >
                  {item.name}
                </Link>
                <div className="flex flex-col items-center justify-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (user) {
                        like(item.service_id);
                      } else {
                        setOpenLogin(true);
                      }
                    }}
                  >
                    <HeartIcon
                      borderColor="#FF4B57"
                      fillColor={wishlist ? "#FF4B57" : "transparent"}
                      className="size-5"
                    />
                  </button>
                  <span className="bg-light-primary dark:bg-secondary text-accent sm:text-light-text sm:dark:text-white text-[10px] sm:text-[14px] px-1">
                    {item.rating}
                  </span>
                </div>
              </div>
              <Link
                href={navLink || `/drips/${item.service_id}`}
                className="w-[90%] mr-auto text-left text-xs font-extralight sm:font-light line-clamp-1 sm:line-clamp-2"
              >
                {item.description}
              </Link>
            </div>
          </div>
          <Link
            href={navLink || `/drips/${item.service_id}`}
            className="w-full flex items-center justify-start gap-7 my-1"
          >
            <div className="flex items-center justify-start space-x-1.5">
              <DropletIcon className="size-3.5 text-accent" />
              <span className="text-[14px] sm:text-[19px] font-normal">
                {item.duration}
              </span>
            </div>
            <div className="flex items-center justify-start space-x-1.5">
              <ClockIcon className="size-3.5 text-accent" />
              <span className="text-[14px] sm:text-[19px] font-normal">
                {item.duration}
              </span>
            </div>
          </Link>
          <div className="w-full flex items-end sm:items-center justify-between mt-2">
            <span className="text-[16px] sm:text-[22px] font-normal">
              AED {item.price_without_vat}
            </span>
            {quantity === 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                    add(
                      parseInt(item.service_id!),
                      item.name!,
                      parseInt(item.price_with_vat),
                      parseInt(item.discount_value!),
                      parseInt(item.price_without_vat),
                    );
                    handleSidebar();
                  }}
                  className="w-28 sm:w-32 border py-1.5 hidden sm:flex border-accent text-xs font-semibold items-center justify-center"
                >
                  <CartTwoIcon className="size-4 sm:size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                    add(
                      parseInt(item.service_id!),
                      item.name!,
                      parseInt(item.price_with_vat),
                      parseInt(item.discount_value!),
                      parseInt(item.price_without_vat),
                    );
                  }}
                  className="w-28 sm:w-32 border py-1.5 sm:hidden flex border-accent text-xs font-semibold items-center justify-center"
                >
                  <CartTwoIcon className="size-4 sm:size-5" />
                </button>
              </>
            ) : (
              <div className="w-28 sm:w-32 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    remove(item);
                    handleDecrement();
                  }}
                  className="border h-full p-1.5 border-accent text-xs font-semibold"
                >
                  <FaMinus className="size-4 sm:size-5" />
                </button>
                <span className="font-semibold text-lg">{quantity}</span>
                <button
                  type="button"
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                    add(
                      parseInt(item.service_id!),
                      item.name!,
                      parseInt(item.price_with_vat),
                      parseInt(item.discount_value!),
                      parseInt(item.price_without_vat),
                    );
                  }}
                  className="border p-1.5 border-accent bg-accent text-white text-xs font-semibold"
                >
                  <FaPlus className="size-4 sm:size-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DripCard;
