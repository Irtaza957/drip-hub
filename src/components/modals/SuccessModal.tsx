import Link from "next/link";
import Image from "next/image";

import Modal from "../global/Modal";
import XIcon from "@/assets/icons/XIcon";
import GreenTick from "@/assets/img/green-tick.svg";
import ArrowRightLongIcon from "@/assets/icons/ArrowRightLongIcon";

const SuccessModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal width="w-fit" open={open} setOpen={setOpen}>
      <div className="relative w-full mx-auto flex flex-col items-center justify-center rounded-lg px-5 pt-10">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-0 right-0 text-accent size-6"
        >
          <XIcon className="size-full" />
        </button>
        <div className="w-full flex flex-col items-center justify-center">
          <Image src={GreenTick} alt="green-tick" />
          <h1 className="text-center text-[24px] text-light-text dark:text-white mt-8">
            Successful!
          </h1>
        </div>
        <p className="w-full text-center text-sm text-light-text dark:text-white font-light mb-9">
          Thank you for your booking and Our expert team will contact shortly
        </p>
        <div className="w-full px-4 mb-7 flex items-center justify-center">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="w-full pt-2 pb-2.5 px-5 bg-accent text-white text-center font-medium text-[20px] flex items-center justify-center"
          >
            <span className="w-full text-center">Back To Home</span>
            <ArrowRightLongIcon />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
