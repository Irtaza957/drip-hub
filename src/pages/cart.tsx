import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import EmptyCart from "@/assets/img/empty-cart.svg";
// @ts-ignore
import { FreeMode, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/grid";
import { RootState } from "@/store";
import XIcon from "@/assets/icons/XIcon";
import DripCardTwo from "@/components/DripCardTwo";
import AuthModal from "@/components/modals/AuthModal";
import { useFetchHomeDataQuery } from "@/store/services/home";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { useApplyPromoMutation } from "@/store/services/booking";
import ArrowRightLongIcon from "@/assets/icons/ArrowRightLongIcon";
import { calculateDiscount, calculateDiscountValue, calculateVAT, calculateWithoutVAT, getSlug } from "@/utils/helpers";
import { addToCart, discardFromCart, removeFromCart, setCart, setPromo } from "@/store/global";

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [prices, setPrices] = useState({
    subtotal: 0,
    discounted_total: 0,
    discounted_amount: 0,
  });
  const [open, setOpen] = useState(false);
  const { data } = useFetchHomeDataQuery({});
  const [promoCode, setPromoCode] = useState("");
  const [startSlide, setStartSlide] = useState(true);
  const [applyPromo, { isLoading }] = useApplyPromoMutation();
  const { user, cart, promo } = useSelector((state: RootState) => state.global);

  const add = (item: CART) => {
    if (item) {
      dispatch(
        addToCart({
          id: item?.id,
          name: item?.name,
          price: item?.price,
          discount: item?.discount,
          quantity: item?.quantity + 1,
          price_without_vat: item?.price,
        })
      );
    }
  };

  const remove = (item: CART) => {
    if (item) {
      if (item.quantity === 1) {
        dispatch(removeFromCart(item.id));
      } else {
        const updatedCart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i);
        dispatch(setCart(updatedCart));
      }
    }
  };

  const discard = (id: number) => {
    dispatch(discardFromCart(id));
  }

  const handlePromo = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("customer_id", user?.customer_id!);
    urlencoded.append("promo_code", promoCode);

    try {
      const { data } = await applyPromo({
        data: urlencoded,
        token: user?.token,
      });

      if (Object.keys(data).length !== 0) {
        toast.success("Applied Promo Successfully!");
      } else {
        toast.error("Promo Expired or Invalid!");
      }
    } catch (err) {
      toast.error("Promo Expired or Invalid!");
    }
  };

  const clearPromo = () => {
    dispatch(setPromo(null));
  };

   const getNavLink = (name: string, category_name: string='') => {
    return `/related-services/${getSlug(category_name)}/${getSlug(name)}`;
  };

  useEffect(() => {
    if (promo) {
      setPromoCode(promo.code);

      const priceList = calculateDiscount(cart, promo);
      setPrices(priceList);
    }
  }, [promo]);

  return (
    <div className="w-full bg-light-primary dark:bg-secondary">
      <AuthModal openLogin={open} setOpenLogin={setOpen} />
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto p-5 md:px-0 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 py-7 sm:py-14">
        <h1 className="col-span-1 text-light-text dark:text-white sm:col-span-2 lg:col-span-3 w-full text-left text-xl sm:text-[42px] mt-[60px] sm:mt-[80px]">
          My Cart ({cart.length} Item{cart.length !== 1 && "s"})
        </h1>
        {cart.length === 0 ? (
          <div className="col-span-1 sm:col-span-3 lg:col-span-4 w-full flex flex-col items-start justify-start gap-5 p-5 bg-white dark:bg-primary border border-[#C9C9C9]/20 divide-y divide-accent/50">
            <div className="w-full h-full flex flex-col items-center justify-center p-10 lg:p-5">
              <Image
                src={EmptyCart}
                alt="empty-wishlist"
                className="size-36 lg:size-44"
              />
              <p className="w-full text-center text-[26px] text-accent font-semibold mb-2">
                Your Cart is Empty!!
              </p>
              <p className="w-full text-center font-semibold text-[16px] text-light-text dark:text-white">
                Explore more and shortlist
                <br />
                some services
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 w-full flex flex-col items-start justify-start gap-5 p-5 bg-white dark:bg-primary text-light-text dark:text-white border border-[#C9C9C9]/20 divide-y divide-accent/50">
              {cart.map((item: CART, idx: number) => (
                <div
                  key={item.id}
                  className={`w-full flex flex-col items-center justify-center gap-5 ${idx !== 0 && "pt-5"
                    }`}
                >
                  <div className="w-full flex items-center justify-between">
                    <p className="w-full text-left text-xl">{item.name}</p>
                    <button type="button" onClick={() => discard(item.id)}>
                      <XIcon className="size-3 text-accent" />
                    </button>
                  </div>
                  <div className="w-full flex items-end justify-between">
                    <div className="flex items-center justify-start border border-accent">
                      <button
                        type="button"
                        onClick={() => {
                          remove(item);
                        }}
                        className="text-xl px-2"
                      >
                        <FaMinus className="w-4 h-4" />
                      </button>
                      <span className="text-xl px-3.5 bg-accent text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          add(item);
                        }}
                        className="text-xl px-2"
                      >
                        <FaPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xl">AED {Math.round(item.price_without_vat || item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-1 w-full h-fit flex flex-col items-start justify-start gap-5 bg-white dark:bg-primary p-5 border border-[#C9C9C9]/20 text-light-text dark:text-white">
              <p className="w-full text-left text-[28px]">Summary</p>
              <div className="w-full flex items-center justify-between p-1.5 border border-light-primary dark:border-tertiary bg-light-primary dark:bg-[#4D515F]">
                <input
                  type="text"
                  placeholder="COUPON"
                  className="w-full bg-transparent p-1.5 text-[14px] font-regular"
                />
                <button
                  disabled={isLoading}
                  className="px-3 pt-1.5 pb-2 text-accent bg-white dark:bg-tertiary capitalize text-[14px]"
                >
                  {isLoading ? (
                    <LuLoader2 className="animate-spin text-accent size-5" />
                  ) : promo ? (
                    <span
                      onClick={() => {
                        setPromoCode("");
                        clearPromo();
                      }}
                    >
                      Remove
                    </span>
                  ) : (
                    <span onClick={handlePromo}>Apply</span>
                  )}
                </button>
              </div>
              <div className="w-full h-full flex flex-col items-start justify-start gap-2.5">
                <div className="w-full flex items-center justify-between">
                  <p>Subtotal</p>
                  <p>
                    AED&nbsp;
                    {calculateWithoutVAT(cart)}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between pb-2.5 border-b border-accent/50">
                  <p>Discount</p>
                  <p>AED&nbsp;{calculateDiscountValue(cart)}</p>
                </div>
                <div className="w-full flex items-center justify-between pb-2.5 border-b border-accent/50">
                  <p>VAT</p>
                  <p>AED&nbsp;{Math.round(Number(calculateVAT(cart)))}</p>
                </div>
                <div className="w-full flex items-center justify-between pb-2.5 border-b border-accent/50 text-lg">
                  <p>Grand Total</p>
                  <p>
                    AED&nbsp;
                    {prices.discounted_total !== 0
                      ? new Intl.NumberFormat().format(prices.discounted_total)
                      : Math.round(calculateVAT(cart) + (calculateWithoutVAT(cart) - calculateDiscountValue(cart)))}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center space-y-5 place-self-end">
                <Link
                  href="/"
                  className="cursor-pointer w-full hidden pt-1 pb-1.5 px-4 sm:flex items-center justify-between bg-light-primary dark:bg-secondary text-accent"
                >
                  <p className="w-full text-center text-lg">To Shop</p>
                  <ArrowRightLongIcon className="w-5 h-5" />
                </Link>
                <div
                  onClick={() => {
                    if (user) {
                      router.push("/checkout");
                    } else {
                      setOpen(true);
                    }
                  }}
                  className="cursor-pointer w-full hidden pt-1 pb-1.5 px-4 sm:flex items-center justify-between bg-accent text-white"
                >
                  <p className="w-full text-center text-lg">Checkout</p>
                  <ArrowRightLongIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto py-5 pb-24 3xl:pb-[600px]">
        <h1 className="w-full text-left text-xl mb-5 px-5 text-light-text dark:text-white">
          Customers Also Viewed
        </h1>
        <div className="w-full block sm:hidden">
          <Swiper
            freeMode={true}
            spaceBetween={10}
            slidesPerView={1.25}
            modules={[FreeMode]}
            onSlideChange={(swiper) => {
              if (swiper.activeIndex === 0) {
                setStartSlide(true);
              } else {
                setStartSlide(false);
              }
            }}
          >
            {data?.map((drip) =>
              drip.section_data.map((drip, i) => (
                <SwiperSlide
                  key={i}
                  className={startSlide && i === 0 ? "pl-5" : ""}
                >
                  <DripCardTwo item={drip} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
        <div className="relative w-full hidden sm:block md:hidden">
          <div
            className={`next-cart absolute cursor-pointer z-30 top-[45%] right-2 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#FF4B57"
              className="size-full text-accent"
            />
          </div>
          <div
            className={`prev-cart absolute cursor-pointer z-30 top-[45%] left-2 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#FF4B57"
              className="size-full text-accent rotate-180"
            />
          </div>
          <Swiper
            freeMode={true}
            spaceBetween={10}
            slidesPerView={2.7}
            modules={[FreeMode, Navigation]}
            navigation={{
              nextEl: `.next-cart`,
              prevEl: `.prev-cart`,
            }}
          >
            {data?.map((drip) =>
              drip.section_data.map((drip, i) => (
                <SwiperSlide
                  key={i}
                  className={startSlide && i === 0 ? "pl-5" : ""}
                >
                  <DripCardTwo item={drip} navLink={getNavLink(drip.name || '', drip?.category_name)}/>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
        <div className="relative w-full hidden md:block lg:hidden">
          <div
            className={`next-cart absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#FF4B57"
              className="size-full text-accent"
            />
          </div>
          <div
            className={`prev-cart absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#FF4B57"
              className="size-full text-accent rotate-180"
            />
          </div>
          <Swiper
            freeMode={true}
            spaceBetween={10}
            slidesPerView={3.15}
            modules={[FreeMode, Navigation]}
            navigation={{
              nextEl: `.next-cart`,
              prevEl: `.prev-cart`,
            }}
          >
            {data?.map((drip, idx) =>
              drip.section_data.map((drip) => (
                <SwiperSlide key={idx}>
                  <DripCardTwo item={drip} navLink={getNavLink(drip.name || '', drip?.category_name)} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
        <div className="relative w-full hidden lg:block xl:hidden">
          <div
            className={`next-cart absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#FF4B57"
              className="size-full text-accent"
            />
          </div>
          <div
            className={`prev-cart absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#FF4B57"
              className="size-full text-accent rotate-180"
            />
          </div>
          <Swiper
            freeMode={true}
            spaceBetween={10}
            slidesPerView={4.1}
            modules={[FreeMode, Navigation]}
            navigation={{
              nextEl: `.next-cart`,
              prevEl: `.prev-cart`,
            }}
          >
            {data?.map((drip, idx) =>
              drip.section_data.map((drip) => (
                <SwiperSlide key={idx}>
                  <DripCardTwo item={drip} navLink={getNavLink(drip.name || '', drip?.category_name)} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
        <div className="relative w-full hidden xl:block">
          <div
            className={`next-cart absolute cursor-pointer z-30 top-[45%] -right-5 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#FF4B57"
              className="size-full text-accent"
            />
          </div>
          <div
            className={`prev-cart absolute cursor-pointer z-30 top-[45%] -left-5 size-12 rounded-2xl bg-light-primary dark:bg-secondary p-4 shadow-md`}
          >
            <ChevronRightIcon
              fillColor="#FF4B57"
              className="size-full text-accent rotate-180"
            />
          </div>
          <Swiper
            freeMode={true}
            spaceBetween={10}
            slidesPerView={4.7}
            modules={[FreeMode, Navigation]}
            navigation={{
              nextEl: `.next-cart`,
              prevEl: `.prev-cart`,
            }}
          >
            {data?.map((drip, idx) =>
              drip.section_data.map((drip) => (
                <SwiperSlide key={idx}>
                  <DripCardTwo item={drip} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Cart;
