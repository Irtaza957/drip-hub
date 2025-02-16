"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaPencil } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import { setSelectedAddress } from "@/store/global";
import {
  useDefaultAddressMutation,
  useFetchAddressesQuery,
} from "@/store/services/address";

const Profile = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const [defAddress, setDefAddress] = useState("");
  const [setDefaultAddress] = useDefaultAddressMutation();
  const { user, accountTab } = useSelector((state: RootState) => state.global);
  const { data, isLoading } = useFetchAddressesQuery(user?.customer_id);

  const handleSelectedAddress = (id: string) => {
    dispatch(setSelectedAddress(id));
  };

  const clearSelectedAddress = () => {
    dispatch(setSelectedAddress(""));
  };

  const handleDefaultAddress = async (id: string) => {
    setDefAddress(id);

    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append("address_id", id);

      const response = await setDefaultAddress(urlencoded);

      if (response.error) {
        // @ts-ignore
        toast.error(response.error.data.error);
      }
    } catch (error) {
      toast.error("Please Try Again!");
    }
  };

  useEffect(() => {
    if (data) {
      setDefAddress(data[0]?.address_id!);
    }
  }, [data]);

  useEffect(() => {
    if (accountTab) {
      setTab(accountTab);
    } else {
      setTab(0);
    }
  }, [accountTab]);

  return (
    <div className="w-full bg-light-primary dark:bg-secondary text-light-text dark:text-white">
      <div className="w-full flex sm:hidden flex-col items-center justify-center space-y-5 mt-[60px] xl:mt-[100px] p-5">
        <h1 className="w-full text-left text-2xl font-light">My Profile</h1>
        <div className="w-full flex flex-col items-start justify-start p-2.5 bg-white dark:bg-primary">
          <div className="w-full grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setTab(0)}
              className={`w-full py-3 ${
                tab === 0 ? "bg-accent text-white" : "bg-light-primary dark:bg-tertiary text-light-text dark:text-white"
              }`}
            >
              My Profile
            </button>
            <button
              type="button"
              onClick={() => setTab(1)}
              className={`w-full py-3 ${
                tab === 1 ? "bg-accent text-white" : "bg-light-primary dark:bg-tertiary text-light-text dark:text-white"
              }`}
            >
              Addresses
            </button>
            {/* <button
              type="button"
              onClick={() => setTab(2)}
              className={`w-full py-3 ${
                tab === 2 ? "bg-accent text-white" : "bg-light-primary dark:bg-tertiary text-light-text dark:text-white"
              }`}
            >
              Wallet
            </button> */}
          </div>
        </div>
        {tab === 0 && (
          <>
            <div className="relative w-24 h-24 bg-white dark:bg-tertiary p-1.5 mr-auto">
              <Image
                src="https://ui.shadcn.com/avatars/04.png"
                alt="profile"
                width={80}
                height={80}
                className="w-full h-full"
              />
              <FaPencil className="w-6 h-6 bg-green-500 text-white p-1 absolute bottom-0 left-0" />
            </div>
            <div className="w-full flex flex-col items-center justify-center space-y-3 bg-white dark:bg-primary border border-accent/20 p-3">
              <Link
                href="edit-profile"
                className="text-xs text-accent bg-light-primary dark:bg-tertiary py-1 px-5 place-self-end"
              >
                Edit
              </Link>
              <div className="w-full grid grid-cols-4">
                <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-1.5 text-gray-500 text-sm">
                  <p className="w-full text-left">Name</p>
                  <p className="w-full text-left">Phone</p>
                  <p className="w-full text-left">Email</p>
                  <p className="w-full text-left">Gender</p>
                  <p className="w-full text-left">DOB</p>
                </div>
                <div className="col-span-3 w-full flex flex-col items-center justify-center space-y-1.5 text-sm">
                  <p className="w-full text-left">
                    {user?.firstname}&nbsp;{user?.lastname}
                  </p>
                  <p className="w-full text-left">{user?.phone}</p>
                  <p className="w-full text-left">{user?.email}</p>
                  <p className="w-full text-left">{user?.gender}</p>
                  <p className="w-full text-left">{user?.date_of_birth}</p>
                </div>
              </div>
            </div>
          </>
        )}
        {tab === 1 && (
          <div className="w-full flex flex-col items-center justify-center space-y-3 divide-y divide-accent/50">
            {data?.map((a) => (
              <div
                key={a.address_id}
                className="w-full flex flex-col items-center justify-center space-y-3 pt-3"
              >
                <div className="w-full flex items-center justify-between">
                  <p className="w-full text-left">{a.address_type}</p>
                  <Link
                    href="address"
                    onClick={() => handleSelectedAddress(a.address_id!)}
                    className="text-xs text-accent bg-white dark:bg-tertiary py-1 px-5 place-self-end"
                  >
                    Edit
                  </Link>
                </div>
                <p className="w-full text-left text-xs text-gray-500">
                  {a.apartment && a.apartment}
                  ,&nbsp;
                  {a.building_no && a.building_no}
                  ,&nbsp;
                  {a.area && a.area}
                </p>
                {defAddress !== a.address_id && (
                  <p
                    onClick={() => handleDefaultAddress(a.address_id!)}
                    className="w-full text-xs text-accent font-light"
                  >
                    Set as Default
                  </p>
                )}
              </div>
            ))}
            <Link
              href="address"
              onClick={clearSelectedAddress}
              className="w-full bg-accent text-white py-3 text-center !mt-10"
            >
              Add New Address
            </Link>
          </div>
        )}
        {/* {tab === 2 && <p className="w-full text-left pb-72">Wallet</p>} */}
      </div>
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto px-5 md:px-0 hidden sm:flex flex-col items-center justify-center space-y-5 pt-[100px] pb-72 3xl:pb-[800px]">
        <h1 className="w-full text-left text-2xl font-light">My Profile</h1>
        <div className="w-full grid grid-cols-4 gap-5 bg-white dark:bg-primary">
          <div className="col-span-1 w-full flex flex-col items-start justify-start space-y-5 p-5 border-r border-accent/50">
            <button
              type="button"
              onClick={() => setTab(0)}
              className={`w-full py-3 ${
                tab === 0 ? "bg-accent text-white" : "bg-light-primary dark:bg-tertiary text-light-text dark:text-white"
              }`}
            >
              My Profile
            </button>
            <button
              type="button"
              onClick={() => setTab(1)}
              className={`w-full py-3 ${
                tab === 1 ? "bg-accent text-white" : "bg-light-primary dark:bg-tertiary text-light-text dark:text-white"
              }`}
            >
              Addresses
            </button>
            {/* <button
              type="button"
              onClick={() => setTab(2)}
              className={`w-full py-3 ${
                tab === 2 ? "bg-accent text-white" : "bg-light-primary dark:bg-tertiary text-light-text dark:text-white"
              }`}
            >
              Wallet
            </button> */}
          </div>
          <div className="col-span-3 w-full flex flex-col items-start justify-start space-y-5 p-5">
            {tab === 0 && (
              <>
                <div className="relative w-24 h-24 bg-light-primary dark:bg-tertiary p-1.5 mr-auto">
                  <Image
                    src="https://ui.shadcn.com/avatars/04.png"
                    alt="profile"
                    width={80}
                    height={80}
                    className="w-full h-full"
                  />
                  <FaPencil className="w-6 h-6 bg-green-500 text-white p-1 absolute bottom-0 left-0" />
                </div>
                <div className="w-full flex flex-col items-center justify-center space-y-3 bg-light-primary dark:bg-primary border border-accent/20 p-3">
                  <Link
                    href="edit-profile"
                    className="text-xs text-accent bg-white dark:bg-tertiary py-1 px-5 place-self-end"
                  >
                    Edit
                  </Link>
                  <div className="w-full grid grid-cols-4">
                    <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-1.5 text-gray-500 text-sm">
                      <p className="w-full text-left">Name</p>
                      <p className="w-full text-left">Phone</p>
                      <p className="w-full text-left">Email</p>
                      <p className="w-full text-left">Gender</p>
                      <p className="w-full text-left">DOB</p>
                    </div>
                    <div className="col-span-3 w-full flex flex-col items-center justify-center space-y-1.5 text-sm">
                      <p className="w-full text-left">
                        {user?.firstname}&nbsp;{user?.lastname}
                      </p>
                      <p className="w-full text-left">{user?.phone}</p>
                      <p className="w-full text-left">{user?.email}</p>
                      <p className="w-full text-left">{user?.gender}</p>
                      <p className="w-full text-left">
                        {user?.date_of_birth}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {tab === 1 && (
              <div className="w-full flex flex-col items-center justify-center space-y-3 divide-y divide-accent/50">
                {isLoading ? (
                  <div className="w-full flex items-center justify-center">
                    <LuLoader2 className="size-10 animate-spin text-accent" />
                  </div>
                ) : (
                  data?.map((a) => (
                    <div
                      key={a.address_id}
                      className="w-full flex flex-col items-center justify-center space-y-3 pt-3"
                    >
                      <div className="w-full flex items-center justify-between">
                        <p className="w-full text-left">{a.address_type}</p>
                        <Link
                          href="address"
                          onClick={() => handleSelectedAddress(a?.address_id!)}
                          className="text-xs text-accent bg-light-primary dark:bg-tertiary py-1 px-5 place-self-end"
                        >
                          Edit
                        </Link>
                      </div>
                      <p className="w-full text-left text-xs text-gray-500">
                        {a.apartment && a.apartment}
                        ,&nbsp;
                        {a.building_no && a.building_no}
                        ,&nbsp;
                        {a.area && a.area}
                      </p>
                      {defAddress !== a.address_id && (
                        <p
                          onClick={() => handleDefaultAddress(a.address_id!)}
                          className="w-full text-xs text-accent font-light cursor-pointer"
                        >
                          Set as Default
                        </p>
                      )}
                    </div>
                  ))
                )}
                <Link
                  href="address"
                  onClick={clearSelectedAddress}
                  className="w-full sm:w-1/3 bg-accent text-white py-3 text-center !mt-10"
                >
                  Add New Address
                </Link>
              </div>
            )}
            {tab === 2 && <p className="w-full text-left">Wallet</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
