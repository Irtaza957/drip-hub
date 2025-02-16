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
import { addToCart, removeFromCart } from "@/store/global";
import { useAddToWishlistMutation } from "@/store/services/wishlist";

const DripCardTwo = ({
  tag,
  item,
  bundle,
}: {
  tag?: string;
  item: DRIP_CARD;
  bundle?: boolean;
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

  const add = (id: number, name: string, price: number, discount: number) => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        discount,
        quantity: 1,
      })
    );
  };

  const remove = (id: number) => {
    dispatch(removeFromCart(id));
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
      <div className="grid grid-cols-1 bg-white dark:bg-primary border border-light-primary dark:border-border p-1.5">
        {tag === "choice" ? (
          <Link
            href={`/drips/${item.service_id}`}
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
            href={`/drips/${item.service_id}`}
            className="relative col-span-2 p-2.5 w-full flex flex-col items-center justify-center bg-light-primary dark:bg-secondary"
          >
            <Image priority alt="card" width={42} height={84} src={DripImage} />
            <p className="text-white bg-[#6B54FA] text-[10px] px-1 py-0.5 italic">
              Best Selling
            </p>
          </Link>
        ) : (
          <div className="relative col-span-2 p-2.5 w-full h-52 flex items-center justify-center bg-light-primary dark:bg-secondary">
            <Link href={`/drips/${item.service_id}`}>
              <Image
                priority
                alt="card"
                width={80}
                height={80}
                src={bundle ? BundleDrips : DripImage}
                className={`${bundle && "size-40"}`}
              />
            </Link>
            <div className="absolute top-2 right-2 flex flex-col items-center justify-center gap-1">
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
              <span className="bg-white dark:bg-highlight text-accent sm:text-light-text sm:dark:text-white text-[10px] sm:text-[14px] px-1">
                {item.rating}
              </span>
            </div>
          </div>
        )}
        <div className="col-span-4 w-full p-3 flex flex-col items-start text-light-text dark:text-white">
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col items-center justify-center">
              <div className="w-full flex items-center sm:items-end justify-center">
                <Link
                  href={`/drips/${item.service_id}`}
                  className="flex-1 text-[16px] sm:text-[22px] text-left font-normal"
                >
                  {item.name}
                </Link>
              </div>
              <Link
                href={`/drips/${item.service_id}`}
                className="w-[90%] mr-auto text-left text-xs font-extralight sm:font-light line-clamp-1 sm:line-clamp-2"
              >
                {item.description}
              </Link>
            </div>
          </div>
          <Link
            href={`/drips/${item.service_id}`}
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
          <div className="w-full flex items-end md:items-center justify-between mt-2">
            <span className="text-[16px] md:text-[22px] font-normal">
              AED {item.price_with_vat}
            </span>
            {quantity === 0 ? (
              <button
                type="button"
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                  add(
                    parseInt(item.service_id!),
                    item.name!,
                    parseInt(item.price_with_vat),
                    parseInt(item.discount_value!)
                  );
                }}
                className="w-28 md:w-32 border py-1.5 border-accent text-xs font-semibold flex items-center justify-center"
              >
                <CartTwoIcon className="size-4 sm:size-5" />
              </button>
            ) : (
              <div className="w-28 md:w-32 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    remove(parseInt(item.service_id!));
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
                      parseInt(item.discount_value!)
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

export default DripCardTwo;
