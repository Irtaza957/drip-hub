import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { LuSettings2 } from "react-icons/lu";

import { RootState } from "@/store";
import WishlistCard from "@/components/WishlistCard";
import FilterModal from "@/components/modals/FilterModal";
import EmptyWishlist from "@/assets/img/empty-wishlist.svg";
import ServiceSkeleton from "@/components/skeleton/Service";
import FilterDrawer from "@/components/drawers/FilterDrawer";
import { useGetWishlistQuery } from "@/store/services/wishlist";

const Wishlist = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState("Price (Low to High)");
  const { user } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useGetWishlistQuery(user?.token);

  return (
    <>
      <div className="w-full bg-light-primary dark:bg-secondary flex flex-col items-center justify-center space-y-5 pt-[75px] sm:pt-[95px] pb-72 xl:pb-[500px] 3xl:pb-[650px] p-5 md:px-0">
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto flex items-center justify-between">
          <h1 className="text-left text-2xl text-light-text dark:text-white">My Wishlist</h1>
          <LuSettings2
            onClick={() => setOpen(true)}
            className="w-7 h-7 text-accent flex sm:hidden cursor-pointer"
          />
          <LuSettings2
            onClick={() => setOpenModal(true)}
            className="w-7 h-7 text-accent sm:flex hidden cursor-pointer"
          />
        </div>
        <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {isLoading ? (
            [...Array(24)].map((_, idx) => <ServiceSkeleton key={idx} />)
          ) : data?.length === 0 ? (
            <div className="col-span-1 sm:col-span-3 lg:col-span-4 w-full flex flex-col items-start justify-start gap-5 p-5">
              <div className="w-full h-full flex flex-col items-center justify-center p-10 lg:p-5">
                <Image
                  src={EmptyWishlist}
                  alt="empty-wishlist"
                  className="size-36 lg:size-44"
                />
                <p className="w-full text-center text-[26px] text-accent font-semibold mb-2">
                  Your Wishlist is Empty!!
                </p>
                <p className="w-full text-center font-semibold text-[16px] text-white">
                  Explore more and shortlist
                  <br />
                  some services
                </p>
              </div>
            </div>
          ) : (
            data?.map((item, idx) => <WishlistCard key={idx} item={item} />)
          )}
        </div>
      </div>
      <FilterDrawer
        open={open}
        value={filter}
        setter={setFilter}
        onClose={() => setOpen(false)}
      />
      <FilterModal
        value={filter}
        open={openModal}
        setter={setFilter}
        setOpen={setOpenModal}
      />
    </>
  );
};

export default Wishlist;
