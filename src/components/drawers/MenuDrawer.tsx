import Link from "next/link";
import { Drawer } from "vaul";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";
import XIcon from "@/assets/icons/XIcon";
import AuthModal from "../modals/AuthModal";
import SunIcon from "@/assets/icons/SunIcon";
import UserIcon from "@/assets/icons/UserIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import BookingIcon from "@/assets/icons/BookingIcon";
import { logout, setAccountTab } from "@/store/global";
import LocationIcon from "@/assets/icons/LocationIcon";
import LanguageIcon from "@/assets/icons/LanguageIcon";
import CheckedBoxIcon from "@/assets/icons/CheckedBoxIcon";
import UncheckedBoxIcon from "@/assets/icons/UncheckedBoxIcon";

const userOptions = [
  {
    id: 1,
    name: "My Profile",
    link: "/profile",
    selection: 0,
    icon: <UserIcon className="size-5" />,
  },
  {
    id: 2,
    name: "My Bookings",
    link: "/bookings",
    selection: null,
    icon: <BookingIcon className="size-5" />,
  },
  {
    id: 3,
    name: "My Addresses",
    link: "/profile",
    selection: 1,
    icon: <LocationIcon className="size-5" />,
  },
  {
    id: 4,
    name: "My Wishlist",
    link: "/wishlist",
    selection: 1,
    icon: <HeartIcon fillColor="transparent" className="size-5" />,
  },
];

const MenuDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [openLogin, setOpenLogin] = useState(false);
  const [language, setLanguage] = useState("English");
  const { user } = useSelector((state: RootState) => state.global);

  const signout = () => {
    dispatch(logout());
  };

  const handleAccountTab = (tab: number) => {
    dispatch(setAccountTab(tab));
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <AuthModal openLogin={openLogin} setOpenLogin={setOpenLogin} />
      <Drawer.Root open={open} onClose={onClose}>
        <Drawer.Portal>
          <Drawer.Overlay
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <Drawer.Content className="bg-white dark:bg-primary text-light-text dark:text-white h-[85vh] flex flex-col px-5 pt-5 pb-20 fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
            <Drawer.Title className="font-medium flex items-center justify-end">
              <button onClick={onClose}>
                <XIcon className="size-6 text-accent" />
              </button>
            </Drawer.Title>
            <div className="relative h-full w-full py-5 flex flex-col items-start justify-start gap-5">
              {user
                ? userOptions.map((item) => (
                    <Link
                      href={item.link}
                      onClick={() => {
                        handleAccountTab(item.selection!);
                        onClose();
                      }}
                      className="w-full flex items-center justify-center gap-5"
                      key={item.id}
                    >
                      {item.icon}
                      <span className="flex-1 flex text-left">{item.name}</span>
                    </Link>
                  ))
                : null}
              <hr className="w-full h-px border-t border-accent/50" />
              <div className="w-full flex items-center justify-start gap-3">
                <LanguageIcon />
                <span className="uppercase text-accent">Language</span>
              </div>
              <div
                onClick={() => {
                  close();
                  setLanguage("English");
                }}
                className="w-full flex items-center justify-start gap-3 cursor-pointer"
              >
                <span className="w-full text-left pl-8">English</span>
                {language === "English" ? (
                  <CheckedBoxIcon className="size-6" />
                ) : (
                  <UncheckedBoxIcon className="size-6" />
                )}
              </div>
              <div
                onClick={() => {
                  close();
                  setLanguage("Arabic");
                }}
                className="w-full flex items-center justify-start gap-3 cursor-pointer"
              >
                <span className="w-full text-left pl-8">Arabic</span>
                {language === "Arabic" ? (
                  <CheckedBoxIcon className="size-6" />
                ) : (
                  <UncheckedBoxIcon className="size-6" />
                )}
              </div>
              <hr className="w-full h-px border-t border-accent/50" />
              <div
                onClick={toggleTheme}
                className="w-full flex items-center justify-start gap-3 cursor-pointer"
              >
                <SunIcon />
                <span className="flex-1 text-left">Dark Mode</span>
                <div className="w-[36px] p-[2px] border border-accent">
                  <div
                    className={`size-[15px] bg-accent transition-all duration-150 ease-linear cursor-pointer ${
                      theme === "dark" ? "translate-x-[15px]" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (user) {
                    signout();
                  } else {
                    onClose();
                    setOpenLogin(true);
                  }
                }}
                className="absolute bottom-0 w-full text-center font-normal text-[14px] uppercase place-self-end"
              >
                {user ? "signout" : "login"}
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default MenuDrawer;
