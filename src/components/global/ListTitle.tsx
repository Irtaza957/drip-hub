import Logo from "@/assets/img/logo.svg";
import LogoLight from "@/assets/img/logo-light.svg";

import Link from "next/link";
import Image from "next/image";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { useTheme } from "next-themes";

const ListTitle = ({
  cn,
  title,
  logo,
}: {
  cn?: string;
  title: string;
  logo?: boolean;
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${cn} w-full flex items-center justify-between px-5 md:px-0`}
    >
      {logo ? (
        <div className="flex items-center justify-start">
          <Image
            src={theme === "light" ? LogoLight : Logo}
            alt="logo"
            className="w-[105px]"
          />
          &nbsp;
          <h1 className="text-left text-xl xl:text-2xl italic pb-1 text-light-text dark:text-white">
            {title}
          </h1>
        </div>
      ) : (
        <h1 className="text-left text-xl xl:text-2xl text-light-text dark:text-white">
          {title}
        </h1>
      )}
      {!title.includes("Related") && (
        <Link href={`/sections/${title.toLowerCase().split(" ").join("-")}`}>
          <ArrowRightIcon className="w-7 h-7 text-accent" />
        </Link>
      )}
    </div>
  );
};

export default ListTitle;
