import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

import { RootState } from "@/store";
import Logo from "@/assets/img/logo.svg";
import FooterLightLogo from "@/assets/img/footer-light-logo.svg";

const Footer = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { cart } = useSelector((state: RootState) => state.global);

  return (
    <div
      className={`${
        router.asPath.includes("location") || router.asPath === "/drips"
          ? "hidden"
          : "flex"
      } w-full items-center justify-center bg-accent dark:bg-primary px-5 py-10 ${
        cart.length > 0 ? "pb-32 sm:pb-10" : "pb-10"
      } border-b-4 border-accent`}
    >
      <footer className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto h-full flex flex-col items-center justify-center space-y-2 text-white">
        <Image
          priority
          alt="logo"
          width={160}
          height={50}
          className="w-40"
          src={theme === "dark" ? Logo : FooterLightLogo}
        />
        <div className="w-full flex items-center justify-center space-x-5 pb-10 border-b border-white dark:border-gray-600 !mt-8">
          <FaFacebook className="w-5 h-5 text-white" />
          <FaInstagram className="w-5 h-5 text-white" />
        </div>
        <div className="w-full h-full flex items-center justify-center gap-10 flex-wrap text-white font-light pt-2 pb-4 xl:px-20 border-b border-white dark:border-gray-600">
          <Link href="/faq">FAQs</Link>
          <Link href="/terms-and-conditions">Terms</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/help">Support</Link>
        </div>
        <h1 className="w-full text-center text-xs font-light !mt-8">
          MOHAP License: 58974
        </h1>
        <h1 className="w-full text-center text-xs font-light">
          &copy; 2024 DripHub Healthcare LLC. All Rights Reserved.
        </h1>
      </footer>
    </div>
  );
};

export default Footer;
