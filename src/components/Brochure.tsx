import Image from "next/image";
import HeaderDrips from "@/assets/img/header-drips.svg";

const Brochure = () => {
  return (
    <div className="w-full xl:w-[60%] mx-auto grid grid-cols-2 px-5 py-10 xl:px-14 gap-2.5 bg-gradient-to-l from-[#6B54FA] to-[#6E1CBF]">
      <div className="col-span-1 w-full flex flex-col items-center justify-center">
        <h1
          style={{ lineHeight: "1.75rem" }}
          className="w-full text-left text-[20px] font-light flex xl:hidden"
        >
          Compare Between Drips
          <br />
          For a Better IV
          <br />
          Experience
        </h1>
        <h1 className="w-full text-left text-6xl xl:flex hidden font-light">
          Compare Between Drips
          <br />
          For a Better IV
          <br />
          Experience
        </h1>
      </div>
      <div className="col-span-1 w-full flex items-center justify-center">
        <Image src={HeaderDrips} alt="header" className="xl:w-full xl:h-full" />
      </div>
    </div>
  );
};

export default Brochure;
