"use client";

import {
  Menu,
  MenuItem,
  MenuItems,
  MenuButton,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import Search from "./Search";
import { RootState } from "@/store";
import Logo from "@/assets/img/logo.svg";
import AuthModal from "../modals/AuthModal";
import SunIcon from "@/assets/icons/SunIcon";
import CartIcon from "@/assets/icons/CartIcon";
import UserIcon from "@/assets/icons/UserIcon";
import MenuIcon from "@/assets/icons/MenuIcon";
import MenuDrawer from "../drawers/MenuDrawer";
import HeartIcon from "@/assets/icons/HeartIcon";
import SearchDrawer from "../drawers/SearchDrawer";
import LogoLight from "@/assets/img/logo-light.svg";
import BookingIcon from "@/assets/icons/BookingIcon";
import CartTwoIcon from "@/assets/icons/CartTwoIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import LanguageIcon from "@/assets/icons/LanguageIcon";
import MagnifierIcon from "@/assets/icons/MagnifierIcon";
import CheckedBoxIcon from "@/assets/icons/CheckedBoxIcon";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import UncheckedBoxIcon from "@/assets/icons/UncheckedBoxIcon";
import { logout, setAccountTab, toggleSidebar } from "@/store/global";
import toast from "react-hot-toast";

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
];

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);
  const { user, wishlistCount, cart } = useSelector(
    (state: RootState) => state.global
  );
  const [openLogin, setOpenLogin] = useState(false);
  const [language, setLanguage] = useState("English");
  const [openSearch, setOpenSearch] = useState(false);

  const signout = () => {
    dispatch(logout());
    toast.success("Logged Out Successfully!");
  };

  const openSidebar = () => {
    dispatch(toggleSidebar());
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
      <MenuDrawer open={openMenu} onClose={() => setOpenMenu(false)} />
      <SearchDrawer open={openSearch} onClose={() => setOpenSearch(false)} />
      <nav className="fixed top-0 left-0 z-50 w-full flex-col items-center justify-between border-b border-light-primary dark:border-secondary">
        <div className="w-full bg-white dark:bg-primary hidden sm:flex items-center justify-center py-5 px-5 md:px-0">
          <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto h-full flex items-center justify-center gap-5">
            <Link href="/" className="w-40 mr-auto">
              <Image
                priority
                width={160}
                height={50}
                alt="logo"
                className="size-full"
                src={theme === "dark" ? Logo : LogoLight}
              />
            </Link>
            <Search />
            <div className="w-fit flex items-center justify-center">
              <div
                onClick={() => {
                  if (user) {
                    router.push("/wishlist");
                  } else {
                    setOpenLogin(true);
                  }
                }}
                className="relative cursor-pointer"
              >
                <HeartIcon
                  fillColor="transparent"
                  className="size-6 text-light-text dark:text-white"
                />
                <div className="absolute -top-2 -right-2 size-4 flex items-center justify-center bg-accent rounded-full">
                  <span className="text-xs text-white">{wishlistCount}</span>
                </div>
              </div>
              <div className="w-px h-5 bg-accent ml-5 mr-4" />
              <button type="button" onClick={openSidebar} className="relative">
                <CartIcon
                  fillColor="transparent"
                  className="size-6 text-light-text dark:text-white"
                />
                <div className="absolute -top-2 -right-2 size-4 flex items-center justify-center bg-accent rounded-full">
                  <span className="text-xs text-white">{cart?.length}</span>
                </div>
              </button>
              <div className="w-px h-5 bg-accent ml-5 mr-4" />
              <Menu>
                <MenuButton className="flex items-center justify-center gap-2">
                  <div className="size-10 bg-accent rounded-full p-2.5">
                    <UserIcon className="size-full text-white" />
                  </div>
                  <ChevronDownIcon className="size-4 text-accent" />
                </MenuButton>
                <Transition
                  enter="transition ease-out duration-75"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <MenuItems
                    anchor="bottom end"
                    className="w-72 h-fit mt-4 flex flex-col items-center z-50 text-light-text dark:text-white bg-white dark:bg-primary shadow-md"
                  >
                    {user ? (
                      userOptions.map((option) => (
                        <MenuItem key={option.id}>
                          {({ close }) => (
                            <Link
                              onClick={() => {
                                handleAccountTab(option.selection!);
                                close();
                              }}
                              href={option.link}
                              className="w-full flex items-center justify-start gap-3 p-3 cursor-pointer hover:bg-light-primary dark:hover:bg-highlight"
                            >
                              {option.icon}
                              <span>{option.name}</span>
                            </Link>
                          )}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        {({ close }) => (
                          <div
                            onClick={() => {
                              setOpenLogin(true);
                              close();
                            }}
                            className="w-full flex items-center justify-center gap-3 p-3 cursor-pointer"
                          >
                            <MdOutlineLogout className="size-5" />
                            <span className="flex-1 text-left">
                              Login / Register
                            </span>
                          </div>
                        )}
                      </MenuItem>
                    )}
                    <hr className="w-[90%] h-px border-t border-accent/50" />
                    <MenuItem>
                      {({ close }) => (
                        <div
                          onClick={close}
                          className="w-full flex items-center justify-start gap-3 px-3 pt-3"
                        >
                          <LanguageIcon />
                          <span className="uppercase text-accent">
                            Language
                          </span>
                        </div>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ close }) => (
                        <div
                          onClick={() => {
                            close();
                            setLanguage("English");
                          }}
                          className="w-full flex items-center justify-start gap-3 px-3 pt-3 cursor-pointer"
                        >
                          <span className="w-full text-left pl-8">English</span>
                          {language === "English" ? (
                            <CheckedBoxIcon className="size-6" />
                          ) : (
                            <UncheckedBoxIcon className="size-6" />
                          )}
                        </div>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ close }) => (
                        <div
                          onClick={() => {
                            close();
                            setLanguage("Arabic");
                          }}
                          className="w-full flex items-center justify-start gap-3 p-3 cursor-pointer"
                        >
                          <span className="w-full text-left pl-8">Arabic</span>
                          {language === "Arabic" ? (
                            <CheckedBoxIcon className="size-6" />
                          ) : (
                            <UncheckedBoxIcon className="size-6" />
                          )}
                        </div>
                      )}
                    </MenuItem>
                    <hr className="w-[90%] h-px border-t border-accent/50" />
                    <MenuItem>
                      <div
                        onClick={() => toggleTheme()}
                        className="w-full flex items-center justify-start gap-3 p-3 cursor-pointer"
                      >
                        <SunIcon />
                        <span className="flex-1 text-left">Dark Mode</span>
                        <div className="w-[36px] p-[2px] border border-accent">
                          <div
                            className={`size-[15px] bg-accent transition-all duration-150 ease-linear cursor-pointer ${
                              theme === "dark"
                                ? "translate-x-[15px]"
                                : "translate-x-0"
                            }`}
                          />
                        </div>
                      </div>
                    </MenuItem>
                    {user && (
                      <MenuItem>
                        <div
                          onClick={signout}
                          className="w-full flex items-center justify-center gap-3 p-3 cursor-pointer"
                        >
                          <MdOutlineLogout className="size-5" />
                          <span className="flex-1 text-left">Logout</span>
                        </div>
                      </MenuItem>
                    )}
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <div className="w-full flex sm:hidden items-center justify-between bg-white dark:bg-primary text-light-text dark:text-white p-5">
          <Link href="/" className="w-64 mr-auto">
            <Image
              priority
              width={112}
              height={50}
              alt="logo"
              className="size-full"
              src={theme === "dark" ? Logo : LogoLight}
            />
          </Link>
          <div className="w-full flex items-center justify-end gap-5">
            <button type="button" onClick={() => setOpenSearch(true)}>
              <MagnifierIcon className="size-5 text-light-text dark:text-white" />
            </button>
            <Link href="/cart" type="button" className="relative">
              <CartTwoIcon className="size-5 text-light-text dark:text-white" />
              <div className="absolute -top-2 -right-2 size-4 flex items-center justify-center bg-accent rounded-full">
                  <span className="text-xs text-white">{cart?.length}</span>
                </div>
            </Link>
            <button type="button" onClick={() => setOpenMenu(true)}>
              <MenuIcon className="size-5 text-light-text dark:text-white" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
