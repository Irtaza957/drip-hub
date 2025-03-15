"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiShareLine } from "react-icons/ri";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import Drip from "@/assets/img/drip.svg";
import XIcon from "@/assets/icons/XIcon";
import DripList from "@/components/DripList";
import ClockIcon from "@/assets/icons/ClockIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import Drips from "@/assets/img/header-drips.svg";
import CompareList from "@/components/CompareList";
import DropletIcon from "@/assets/icons/DropletIcon";
import CartTwoIcon from "@/assets/icons/CartTwoIcon";
import AuthModal from "@/components/modals/AuthModal";
import { useAddToWishlistMutation } from "@/store/services/wishlist";
import { addToCart, removeFromCart, toggleSidebar } from "@/store/global";
import he from "he";
import dayjs from "dayjs";
import Accordion from "@/components/Accordion";

const DripDetails = ({ data }: { data: DRIP_DETAIL_RESPONSE }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [bundle, setBundle] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [compare, setCompare] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [addToWishlist] = useAddToWishlistMutation();
  const [list, setList] = useState<Set<string>>(new Set<string>());
  const { user, cart } = useSelector((state: RootState) => state.global);
  const [tab, setTab] = useState<string>(data?.sections[0]?.name);

  const addToList = (item: string) => {
    if (list.has(item)) {
      setList((prevList) => {
        const newList = new Set(prevList);
        newList.delete(item);
        return newList;
      });
    } else {
      setList((prevList) => new Set(prevList).add(item));
    }
  };

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleDecrement = () => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity((prev) => prev - 1);
    }
    dispatch(removeFromCart(data.service_id));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    if (data.service_id !== undefined) {
      dispatch(
        addToCart({
          id: parseInt(data.service_id),
          name: data.service_name,
          price: data?.bundles[bundle]?.price_without_vat || data.price,
          price_with_vat: data?.bundles[bundle]?.price_with_vat,
          discount: data.discount_value,
          quantity: 1,
          price_without_vat: data?.bundles[bundle]?.price_without_vat,
        })
      );
    }
  };

  const like = async () => {
    setWishlist((prev) => (prev = !prev));

    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append("customer_id", user?.customer_id!);
      urlencoded.append("service_id", data?.service_id);

      const response = await addToWishlist({
        data: urlencoded,
        token: user?.token,
      });

      if (response.error) {
        // @ts-ignore
        toast.error(response.error.data.error);
      } else {
        if (wishlist) {
          toast.success("Removed from Wishlist!");
          setWishlist(false);
        } else {
          toast.success("Added to Wishlist!");
          setWishlist(true);
        }
      }
    } catch (error) {
      toast.error("Please Try Again!");
    }
  };

  // const formattedText = (text: string) => {
  //   return text.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  // };

  useEffect(() => {
    if (data.service_id !== undefined) {
      const product = cart.find(
        (item: CART) => item.id === parseInt(data.service_id)
      );

      if (product) {
        setQuantity(product?.quantity);
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      if (data.wishlist_id) {
        setWishlist(true);
      }
    }
  }, [data]);

  return (
    <div className="w-full bg-light-primary dark:bg-secondary">
      <AuthModal openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <div className="w-full flex sm:hidden flex-col items-center justify-center space-y-5 mt-[60px] p-5 bg-white dark:bg-secondary">
        <div className="relative w-full h-[300px] py-8 flex items-center justify-center bg-light-primary dark:bg-[#3B3F4B]/40">
          <Image src={Drip} alt="drip" className="w-full h-full" />
          <button type="button" onClick={() => router.back()}>
            <XIcon className="absolute top-2.5 right-2.5 size-6 text-accent" />
          </button>
        </div>
        <div className="w-full flex flex-col items-center justify-center !mt-10 text-light-text dark:text-white">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-left text-[20px] w-full">
              {data.service_name}
            </h1>
            <div className="flex items-center justify-center space-x-3">
              <RiShareLine className="size-6" />
              <button
                type="button"
                onClick={() => {
                  if (user) {
                    like();
                  } else {
                    setOpenLogin(true);
                  }
                }}
              >
                <HeartIcon
                  borderColor="#FF4B57"
                  fillColor={wishlist ? "#FF4B57" : "transparent"}
                  className="size-6"
                />
              </button>
            </div>
          </div>
          <p className="w-full text-left mt-2 text-[14px] font-light line-clamp-1">
            {data.description}
          </p>
          <div className="w-full grid grid-cols-3 mt-5">
            <div className="col-span-1 w-full flex items-center justify-start space-x-1.5">
              <DropletIcon className="w-4 h-4 text-accent" />
              <span className="text-base">250ml</span>
            </div>
            <div className="col-span-1 w-full flex items-center justify-start space-x-1.5">
              <ClockIcon className="w-4 h-4 text-accent" />
              <span className="text-base">{data.duration}</span>
            </div>
            <button
              type="button"
              onClick={() => setCompare(true)}
              className="px-4 pt-0.5 pb-1 bg-accent text-white place-self-end text-base"
            >
              Compare
            </button>
          </div>
          <div className="w-full grid grid-cols-2 gap-5 my-5">
            {data?.bundles.map((b, index) => (
              <div
                key={index}
                onClick={() => setBundle(index)}
                className="col-span-1 w-full flex items-center justify-start space-x-3 cursor-pointer"
              >
                <div className="w-6 h-6 p-1 border border-accent">
                  <div
                    className={`w-full h-full ${bundle == index && "bg-accent"}`}
                  />
                </div>
                <span>{b.bundle}</span>
              </div>
            ))}
          </div>
          {/* {data.description && <div className="w-full flex flex-col items-center justify-center space-y-2">
            <h1 className="text-left text-[20px] w-full">Description</h1>
            <p className="w-full text-left font-light mt-2 mb-5 text-[14px]">
              {data.description}
            </p>
          </div>}
          {data.sections.map((section, idx) => (
            <div
              key={idx}
              className="w-full flex flex-col items-center justify-center space-y-2 mt-5"
            >
              <h1 className="text-left text-[20px] w-full">{section.name}</h1>
              <p className="w-full text-left text-[14px] font-light">
                {section.description}
              </p>
            </div>
          ))} */}
        </div>
        <div className="fixed z-30 bottom-0 left-0 w-full p-5 flex items-center justify-center bg-light-primary dark:bg-primary">
          {quantity === 0 ? (
            <button
              onClick={() => handleIncrement()}
              className="w-full h-12 py-2 px-12 flex items-center justify-between bg-accent text-white"
            >
              <span className="text-[20px]">AED {data?.bundles[bundle]?.price_without_vat || data.price}</span>
              <span className="text-[20px]">Add to Cart</span>
            </button>
          ) : (
            <div className="w-full h-12 py-2 px-12 flex items-center justify-center bg-accent">
              <button
                type="button"
                className="border h-full w-[35px] flex items-center justify-center"
                onClick={() => handleDecrement()}
              >
                <FaMinus />
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button
                type="button"
                className="border h-full w-[35px] flex items-center justify-center"
                onClick={() => handleIncrement()}
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="md:w-[90%] lg:max-w-[1440px] mx-auto">
        <div className="w-full hidden sm:flex p-5 md:px-0">
          <div className="w-full flex flex-col items-center justify-center gap-7 lg:gap-12 p-8 mt-[80px] bg-white dark:bg-primary">
            <div className="w-full grid grid-cols-2 gap-8 lg:gap-16 xl:gap-0">
              <div className="col-span-1 w-full">
                <Image
                  src={Drips}
                  alt="drip"
                  className="w-full h-full xl:w-[calc(100%-80px)] bg-light-primary dark:bg-secondary p-20"
                />
              </div>
              <div className="col-span-1 w-full flex flex-col items-start justify-between md:mb-28 text-light-text dark:text-white">
                <div className="w-full flex flex-col items-center justify-center gap-2 lg:gap-4">
                  <div className="w-full flex items-center justify-center">
                    <h1 className="flex-1 text-left text-[36px] !leading-[36px] font-medium w-full">
                      {data.service_name}
                    </h1>
                    <button
                      type="button"
                      onClick={() => {
                        if (user) {
                          like();
                        } else {
                          setOpenLogin(true);
                        }
                      }}
                    >
                      <HeartIcon
                        fillColor={wishlist ? "#FF4B57" : "transparent"}
                        className="size-6 text-accent"
                      />
                    </button>
                  </div>
                  <p className="w-full text-left font-light line-clamp-1 lg:line-clamp-4">
                    {data.description}
                  </p>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-2 lg:gap-6">
                  <div className="w-full flex items-center justify-start">
                    <div className="w-full flex items-center justify-start gap-3">
                      <DropletIcon className="size-4 lg:size-5 text-accent" />
                      <span className="text-base lg:text-[21px]">250ml</span>
                    </div>
                    <div className="w-full flex items-center justify-start gap-3">
                      <ClockIcon className="size-4 lg:size-5 text-accent" />
                      <span className="text-base lg:text-[21px]">
                        {data.duration}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-start">
                    <p className="text-left text-[#A3A3A3] line-through">
                      {data.discount_value && (
                        <p className="line-through text-gray-500 text-sm lg:text-base mr-10">
                          AED {data?.bundles[bundle]?.price_without_vat || data.price}
                        </p>
                      )}
                    </p>
                    <p className="text-left text-lg lg:text-xl">
                      AED&nbsp;{data?.bundles[bundle]?.price_without_vat || data.price}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-start gap-4">
                    <div className="w-64 flex items-center justify-start space-x-5">
                      {quantity === 0 ? (
                        <button
                          onClick={() => {
                            handleIncrement();
                            handleSidebar();
                          }}
                          className="w-full h-[32px] lg:h-[46px] bg-transparent border border-accent font-medium flex items-center justify-center"
                        >
                          <CartTwoIcon className="text-accent size-4 lg:size-6" />
                        </button>
                      ) : (
                        <div className="w-full flex items-center justify-between">
                          <span
                            onClick={handleDecrement}
                            className="size-[32px] lg:size-[46px] px-2 text-accent border border-accent hover:bg-accent hover:text-white flex items-center justify-center cursor-pointer"
                          >
                            <FaMinus />
                          </span>
                          <span className="text-lg font-bold">{quantity}</span>
                          <span
                            onClick={handleIncrement}
                            className="size-[32px] lg:size-[46px] px-2 border border-accent bg-accent text-white flex items-center justify-center cursor-pointer"
                          >
                            <FaPlus />
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setCompare(true)}
                      className="h-[32px] lg:h-[46px] px-6 pb-1 bg-accent border border-accent text-white place-self-end"
                    >
                      Compare
                    </button>
                  </div>
                  <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 items-center justify-between !mt-2">
                    {data?.bundles.map((b, index) => (
                      <div
                        key={index}
                        onClick={() => setBundle(index)}
                        className="col-span-1 w-full flex items-center justify-start space-x-3 cursor-pointer"
                      >
                        <div className="w-6 h-6 p-1 border border-accent">
                          <div
                            className={`w-full h-full ${bundle === index && "bg-accent"
                              }`}
                          />
                        </div>
                        <span>{b.bundle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="w-full grid grid-cols-2 gap-7 lg:gap-12 xl:gap-0 text-light-text dark:text-white">
            <div className="col-span-1 w-full flex flex-col items-center justify-center gap-5">
            {data.description && <div className="w-full flex flex-col items-center justify-center space-y-2">
                <h1 className="text-left text-xl w-full">Description</h1>
                <p className="w-full text-sm text-left font-light mt-2 mb-5">
                  {data.description}
                </p>
              </div>}
              {data.sections.length !== 0 && (
                <div className="w-full flex flex-col items-center justify-center space-y-2 mt-5">
                  <h1 className="text-left text-xl w-full">
                    {data.sections[0].name}
                  </h1>
                  <p className="w-full text-sm text-left" dangerouslySetInnerHTML={{ __html: formattedText(data.sections[0].description )}} />
                </div>
              )}
            </div>
            {data.sections.length !== 0 && (
              <div className="col-span-1 w-full flex flex-col items-start justify-start">
                <div className="w-full flex flex-col items-center justify-center space-y-2">
                  <h1 className="text-left text-xl w-full">
                    {data.sections[1].name}
                  </h1>
                  <p className="w-full text-sm text-left" dangerouslySetInnerHTML={{ __html: formattedText(data.sections[1].description )}} />
                </div>
              </div>
            )}
          </div> */}
          </div>
        </div>
        <div className="md:hidden flex flex-col items-center justify-center space-y-3 px-5 mb-8">
          {data.sections.map((section, idx) => (
            <Accordion section={section} key={idx} />
          ))}
          <Accordion section={{name: 'Service Ratings & Reviews'}}>
          <div className="ml- w-full">
              <div className="col-span-1 w-full grid grid-cols-2 gap-2.5 divide-x divide-gray-400">
                <div className="col-span-1 w-full flex flex-col items-start justify-start space-y-2.5">
                  <p className="w-full text-left text-2xl font-bold">
                    {data.rating}
                    <span className="text-primary text-lg font-medium">
                      &nbsp;/ 5.0
                    </span>
                  </p>
                  <div className="w-full flex items-center justify-start gap-1.5">
                    {[...Array(parseInt(data.rating))].map((id, idx) => (
                      <FaStar key={idx} className="w-6 h-6 text-accent" />
                    ))}
                    {[...Array(5 - parseInt(data.rating))].map((id, idx) => (
                      <FaStar key={idx} className="w-6 h-6 text-[#DDDDDD]" />
                    ))}
                  </div>
                  <p className="w-full text-left text-2xl font-bold">
                    {data.total_reviews}&nbsp;
                    <span className="text-primary text-lg font-medium">
                      Ratings
                    </span>
                  </p>
                </div>
                <div className="col-span-1 w-full flex flex-col pl-2.5">
                  {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="w-full grid grid-cols-12 gap-x-2">
                      <div className="col-span-1 w-full flex items-center justify-center">
                        <span className="font-extrabold pt-0.5">{5 - idx}</span>
                      </div>
                      <div className="col-span-2 w-full flex items-center justify-center">
                        <FaStar className="text-amber-500 size-4" />
                      </div>
                      <div className="col-span-5 w-full flex items-center justify-center">
                        <div className="w-full border-[3px] rounded-full border-amber-500" />
                      </div>
                      <div className="col-span-4 w-full flex items-center justify-center">
                        <span className="font-medium">1,432</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full col-span-2 flex flex-col space-y-5">
                {data.reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="w-full flex flex-col items-center justify-center space-x-5"
                  >
                    <div className="w-full flex items-center justify-start space-x-6">
                      <Image
                        src="https://ui.shadcn.com/avatars/04.png"
                        alt="user"
                        width={50}
                        height={50}
                        className="rounded-full bg-gray-200"
                      />
                      <div className="w-full flex flex-col items-center justify-start space-y-1">
                        <div className="w-full flex items-center justify-start space-x-10">
                          <p className="font-bold">{review.customer || 'User'}</p>
                          <div className="flex items-center justify-center gap-0.5">
                            {[...Array(parseInt(review.review))].map((id, idx) => (
                              <FaStar key={idx} className="text-accent" />
                            ))}
                            {[...Array(5 - parseInt(review.review))].map(
                              (id, idx) => (
                                <FaStar key={idx} className="text-gray-300" />
                              )
                            )}
                          </div>
                        </div>
                        <span className="w-full text-left text-xs text-gray-400">
                          {dayjs(review?.created_at).format("ddd DD MMM, YYYY")}
                        </span>
                      </div>
                    </div>
                    <p className="w-full pl-16 text-left text-sm text-[#535763] font-medium pt-3">
                      {review.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Accordion>
        </div>
        <div className="w-full hidden md:flex flex-col items-center justify-center pb-8 space-y-5">
          <div className="w-full flex space-x-2.5 bg-[#F5F5F5] p-4 rounded-lg">
            {data.description &&
              <p
                onClick={() => setTab("Description")}
                className={`text-center px-9 py-2.5 cursor-pointer rounded-full font-semibold text-xs md:text-sm ${tab === "Description"
                  ? "bg-primary text-white"
                  : "bg-[#DDDDDD] text-[#555555]"
                  }`}
              >
                Description
              </p>}
            {data.sections.map((section, idx) => (
              <>
                <p
                  key={idx}
                  onClick={() => setTab(section.name)}
                  className={`text-center px-9 py-2.5 cursor-pointer rounded-full font-semibold text-xs md:text-sm ${tab === section.name
                    ? "bg-primary text-white"
                    : "bg-[#DDDDDD] text-[#555555]"
                    }`}
                >
                  {section.name}
                </p>
              </>
            ))}
            <p
              onClick={() => setTab("Ratings")}
              className={`text-center px-9 py-2.5 cursor-pointer rounded-full font-semibold text-xs md:text-sm ${tab === "Ratings"
                ? "bg-primary text-white"
                : "bg-[#DDDDDD] text-[#555555]"
                }`}
            >
              Service Ratings & Reviews
            </p>
          </div>
          {(tab === "Description" && data.description) && <p
            dangerouslySetInnerHTML={{ __html: he.decode(data.description) }}
            className="w-full text-left text-white font-medium px-4 text-sm"
          />}
          {data.sections
            .filter((section) => section.name === tab)
            .map((section, idx) => (
              <p
                key={idx}
                dangerouslySetInnerHTML={{ __html: he.decode(section.description) }}
                className="w-full text-left text-white font-medium px-4 text-sm"
              />
            ))}
          {tab === "Ratings" &&
            <div className="ml-10 w-full">
              <div className="col-span-1 w-full grid grid-cols-2 gap-2.5 divide-x divide-gray-400">
                <div className="col-span-1 w-full flex flex-col items-start justify-start space-y-2.5">
                  <p className="w-full text-left text-2xl font-bold">
                    {data.rating}
                    <span className="text-white text-lg font-medium">
                      &nbsp;/ 5.0
                    </span>
                  </p>
                  <div className="w-full flex items-center justify-start gap-1.5">
                    {[...Array(parseInt(data.rating))].map((id, idx) => (
                      <FaStar key={idx} className="w-6 h-6 text-accent" />
                    ))}
                    {[...Array(5 - parseInt(data.rating))].map((id, idx) => (
                      <FaStar key={idx} className="w-6 h-6 text-[#DDDDDD]" />
                    ))}
                  </div>
                  <p className="w-full text-left text-2xl font-bold">
                    {data.total_reviews}&nbsp;
                    <span className="text-white text-lg font-medium">
                      Ratings
                    </span>
                  </p>
                </div>
                <div className="col-span-1 w-full flex flex-col pl-2.5">
                  {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="w-full grid grid-cols-12 gap-x-2">
                      <div className="col-span-1 w-full flex items-center justify-center">
                        <span className="font-extrabold pt-0.5">{5 - idx}</span>
                      </div>
                      <div className="col-span-2 w-full flex items-center justify-center">
                        <FaStar className="text-amber-500 size-4" />
                      </div>
                      <div className="col-span-5 w-full flex items-center justify-center">
                        <div className="w-full border-[3px] rounded-full border-amber-500" />
                      </div>
                      <div className="col-span-4 w-full flex items-center justify-center">
                        <span className="font-medium">1,432</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full col-span-2 flex flex-col space-y-5">
                {data.reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="w-full flex flex-col items-center justify-center space-x-5"
                  >
                    <div className="w-full flex items-center justify-start space-x-6">
                      <Image
                        src="https://ui.shadcn.com/avatars/04.png"
                        alt="user"
                        width={50}
                        height={50}
                        className="rounded-full bg-gray-200"
                      />
                      <div className="w-full flex flex-col items-center justify-start space-y-1">
                        <div className="w-full flex items-center justify-start space-x-10">
                          <p className="font-bold">{review.customer || 'User'}</p>
                          <div className="flex items-center justify-center gap-0.5">
                            {[...Array(parseInt(review.review))].map((id, idx) => (
                              <FaStar key={idx} className="text-accent" />
                            ))}
                            {[...Array(5 - parseInt(review.review))].map(
                              (id, idx) => (
                                <FaStar key={idx} className="text-gray-300" />
                              )
                            )}
                          </div>
                        </div>
                        <span className="w-full text-left text-xs text-gray-400">
                          {dayjs(review?.created_at).format("ddd DD MMM, YYYY")}
                        </span>
                      </div>
                    </div>
                    <p className="w-full pl-16 text-left text-sm text-[#535763] font-medium pt-3">
                      {review.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>}
        </div>
        <div className="w-full flex flex-col items-center space-y-5 px-5 pb-5 border-t border-[#DDDDDD] pt-8">
          <h1 className="col-span-2 w-full text-left text-xl font-bold">
            FAQs
          </h1>
          <div className="w-full flex flex-col items-center justify-center space-y-2.5">
            {data.faqs.map((section, idx) => (
              <Accordion section={section} key={idx} />
            ))}
          </div>
        </div>
      </div>
      {data?.similar_services.length !== 0 && (
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto py-5 pb-24 3xl:pb-[600px]">
          <DripList title="Related IV Drips" data={data.similar_services} />
        </div>
      )}
      <CompareList
        list={list}
        open={compare}
        onClose={setCompare}
        addToList={addToList}
      />
    </div>
  );
};

export default DripDetails;

export async function getStaticPaths() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/services`,
    {
      method: "GET",
      headers: {
        "company-id": `${process.env.NEXT_PUBLIC_COMPANY_ID!}`,
        "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY!}`,
        "business-id": `${process.env.NEXT_PUBLIC_BUSINESS_ID!}`,
      },
    }
  );

  const drips: DRIP_RESPONSE = await response.json();

  const paths = drips.data.map((service: DRIP_CARD) => ({
    params: { id: `${service?.service_id!}` },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/services?id=${params.id}`,
    {
      method: "GET",
      headers: {
        "company-id": `${process.env.NEXT_PUBLIC_COMPANY_ID!}`,
        "secret-key": `${process.env.NEXT_PUBLIC_SECRET_KEY!}`,
        "business-id": `${process.env.NEXT_PUBLIC_BUSINESS_ID!}`,
      },
    }
  );
  const service: { status: number; error: string; data: DRIP_DETAIL_RESPONSE } =
    await response.json();

  return { props: { data: service.data } };
}
