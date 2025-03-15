"use client";

import { useState } from "react";
import PhoneInput, {
  Value,
  PhoneNumber,
  parsePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import toast from "react-hot-toast";
import { OTPInput } from "input-otp";
import { LuLoader2 } from "react-icons/lu";

import XIcon from "@/assets/icons/XIcon";
import "react-phone-number-input/style.css";
import Slot from "@/components/global/Slot";
import RegisterModal from "./RegisterModal";
import Modal from "@/components/global/Modal";
import Timer from "@/components/global/Timer";
import ArrowRightLongIcon from "@/assets/icons/ArrowRightLongIcon";
import { useGetOTPMutation, useVerifyOTPMutation } from "@/store/services/auth";

const phonePattern = /^\+?[1-9]\d{1,14}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface AuthModalProps {
  openLogin: boolean;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({ openLogin, setOpenLogin }: AuthModalProps) => {
  const [otp, setOTP] = useState("");
  const [regOTP, setRegOTP] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [openVerify, setOpenVerify] = useState(false);
  const [getOTP, { isLoading }] = useGetOTPMutation();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [openRegister, setOpenRegister] = useState(false);
  const [phone, setPhone] = useState<Value | undefined>();
  const [verifyOTP, { isLoading: verifying }] = useVerifyOTPMutation();

  const handleBlur = () => {
    const parsedPhoneNumber: PhoneNumber = parsePhoneNumber(`${phone}`, "AE")!;
    if (parsedPhoneNumber.isValid()) {
      return true;
    } else {
      toast.error("Invalid Phone Number!");
      return false;
    }
  };

  const handleLogin = async () => {
    const urlencoded = new URLSearchParams();

    if (isLogin) {
      if (
        !phonePattern.test(emailOrPhone) &&
        !emailPattern.test(emailOrPhone)
      ) {
        toast.error("Please Enter Valid Email or Phone!");
        return;
      }
    }

    if (!isLogin && !handleBlur()) {
      toast.error("Please Enter Valid Phone!");
      return;
    }

    if (isLogin) {
      if (emailPattern.test(emailOrPhone)) {
        urlencoded.append("email", emailOrPhone);
      }
      if (phonePattern.test(emailOrPhone)) {
        urlencoded.append("phone", emailOrPhone);
      }
    } else {
      urlencoded.append("phone", phone!);
    }

    try {
      const data: any = await getOTP({
        type: isLogin ? "login" : "register",
        formData: urlencoded,
      });
      
      if (data.error) {
        toast.error(data.error?.data?.error || "Something went wrong!");
      } else {
        if (!isLogin) {
          if (data.data.data.otp) {
            setRegOTP(data.data.data.otp);
          }
        }
        setOpenLogin(false);
        setOpenVerify(true);
        toast.success("Please Enter your OTP Now.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
    }
  };

  const handleLoginVerification = async () => {
    const urlencoded = new URLSearchParams();
    if (isLogin) {
      if (emailPattern.test(emailOrPhone)) {
        urlencoded.append("email", emailOrPhone);
      }

      if (phonePattern.test(emailOrPhone)) {
        urlencoded.append("phone", emailOrPhone);
      }
    }

    urlencoded.append("otp", otp);

    try {
      if (isLogin) {
        const data = await verifyOTP({
          type: "login",
          formData: urlencoded,
        });

        if (!data.error) {
          toast.success("Logged in Successfully!");
          setOpenVerify(false);
        } else {
          toast.error("Please Enter Correct OTP!");
        }
      } else {
        if (parseInt(regOTP) === parseInt(otp)) {
          toast.success("Verified Successfully!");
          setOpenVerify(false);
          setOpenRegister(true);
          setPhone(undefined);
          setEmailOrPhone("");
          setOTP("");
          setIsLogin(true);
        } else {
          toast.error("Please Enter Correct OTP!");
        }
      }
    } catch (err) {
      toast.error("Please Try Again!");
    }
  };

  return (
    <>
      <Modal
        width="w-[90%] sm:w-[60%] md:w-[45%] lg:w-[35%] xl:w-[25%] 3xl:w-[15%]"
        open={openLogin}
        setOpen={setOpenLogin}
      >
        <div className="w-full flex flex-col items-center justify-center relative">
          <button type="button" onClick={() => setOpenLogin(false)}>
            <XIcon className="text-accent absolute top-0 right-0 size-5 cursor-pointer" />
          </button>
          <div className="w-full flex flex-col items-center justify-center gap-1.5 mt-5 mb-7">
            <h1 className="w-full text-center text-[24px]">
              Let&apos;s get started
            </h1>
            <p className="w-full text-center text-[14px] font-light">
              Secure access to your health
              <br />
              journey begins here.
            </p>
          </div>
          <div className="w-[90%] sm:w-2/3 grid grid-cols-2 gap-5 mb-5">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`col-span-1 w-full pt-1.5 pb-2 font-medium ${
                isLogin
                  ? "text-white bg-accent"
                  : "text-accent bg-light-primary dark:bg-secondary border border-accent/50"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`col-span-1 w-full pt-1.5 pb-2 font-medium ${
                !isLogin
                  ? "text-white bg-accent"
                  : "text-accent bg-light-primary dark:bg-secondary border border-accent/50"
              }`}
            >
              Sign-up
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="w-[90%] sm:w-2/3 flex flex-col items-center justify-center space-y-5"
          >
            {isLogin ? (
              <input
                type="text"
                value={emailOrPhone}
                placeholder="Email or Phone Number"
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full p-3 bg-light-primary dark:bg-tertiary text-accent placeholder:text-gray-500"
              />
            ) : (
              <PhoneInput
                className="w-full p-3 bg-light-primary dark:bg-tertiary text-accent placeholder:text-gray-500"
                defaultCountry="AE"
                international
                placeholder="+7 909 22-55-456"
                value={phone}
                onChange={setPhone}
                error={
                  phone
                    ? isValidPhoneNumber(phone)
                      ? undefined
                      : "Invalid phone number"
                    : "Phone number required"
                }
              />
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full pt-1.5 pb-2 px-4 text-white bg-accent flex items-center justify-between !my-14"
            >
              {isLoading ? (
                <div className="w-full flex items-center justify-center space-x-3">
                  <LuLoader2 className="animate-spin size-5 mt-1" />
                  <span className="text-xl">Please Wait...</span>
                </div>
              ) : (
                <>
                  <p className="w-full text-center text-xl">Continue</p>
                  <ArrowRightLongIcon className="w-5 h-5 mt-1" />
                </>
              )}
            </button>
          </form>
          <p
            onClick={() => setOpenLogin(false)}
            className="w-full text-center text-gray-500 text-xs cursor-pointer mb-4"
          >
            Continue as Guest
          </p>
        </div>
      </Modal>
      <Modal
        open={openVerify}
        setOpen={setOpenVerify}
        width="w-[90%] sm:w-[60%] md:w-[45%] lg:w-[35%] xl:w-[25%] 3xl:w-[15%]"
      >
        <div className="w-full flex flex-col items-center justify-center relative">
          <button type="button" onClick={() => setOpenVerify(false)}>
            <XIcon className="text-accent absolute top-0 right-0 size-5 cursor-pointer" />
          </button>
          <div className="w-full flex flex-col items-center justify-center gap-1.5 mt-5 mb-7">
            <h1 className="w-full text-center text-xl font-semibold">
              Verify your Phone
            </h1>
            <p className="w-full text-center text-xs">
              OTP has been sent to
              <br />
              +971 56 330 2017
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLoginVerification();
            }}
            className="w-[90%] sm:w-2/3 flex flex-col items-center justify-center"
          >
            <OTPInput
              value={otp}
              maxLength={6}
              onChange={setOTP}
              containerClassName="w-fit bg-light-primary dark:bg-secondary border border-light-primary dark:border-[#2F3546]"
              render={({ slots }) => (
                <>
                  <div className="flex">
                    {slots.map((slot, idx) => (
                      <>
                        <Slot key={idx} {...slot} />
                        <div
                          className={`w-px h-5 border-l border-accent mt-[11px] sm:mt-3.5 ${
                            idx === 5 ? "hidden" : "block"
                          }`}
                        />
                      </>
                    ))}
                  </div>
                </>
              )}
            />
            <div className="mt-8 mb-5">
              <Timer phone={emailOrPhone} />
            </div>
            <button
              type="submit"
              disabled={verifying}
              className="w-full px-4 pt-1.5 pb-2 text-white bg-accent flex items-center justify-between !mb-14"
            >
              {verifying ? (
                <div className="w-full flex items-center justify-center space-x-3">
                  <LuLoader2 className="animate-spin size-5 mt-1" />
                  <span className="text-xl">Please Wait...</span>
                </div>
              ) : (
                <>
                  <p className="w-full text-center text-xl">Continue</p>
                  <ArrowRightLongIcon className="w-5 h-5 mt-1" />
                </>
              )}
            </button>
          </form>
          <p
            onClick={() => {
              setOpenVerify(false);
              setOpenLogin(true);
            }}
            className="w-full text-center text-gray-500 text-xs cursor-pointer mb-4"
          >
            Login with Email
          </p>
        </div>
      </Modal>
      <RegisterModal
        open={openRegister}
        setOpen={setOpenRegister}
        setLogin={setOpenLogin}
        setEmailOrPhone={setEmailOrPhone}
        setOTP={setOTP}
        setOpenLogin={setOpenLogin}
      />
    </>
  );
};

export default AuthModal;
