"use client";

import { RootState } from "@/store";
import DateModal from "./DateModal";
import XIcon from "@/assets/icons/XIcon";
import "react-phone-number-input/style.css";
import Modal from "@/components/global/Modal";
import DateDrawer from "../drawers/DateDrawer";
import { fetchCountries } from "@/utils/helpers";
import SelectMenu from "@/components/global/SelectMenu";
import { useRegisterMutation } from "@/store/services/auth";

import dayjs from "dayjs";
import PhoneInput, {
  Value,
  Country,
  PhoneNumber,
  parsePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const RegisterModal = ({
  open,
  setOpen,
  setLogin,
  setEmailOrPhone,
  setOTP,
  setOpenLogin,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailOrPhone: React.Dispatch<React.SetStateAction<string>>;
  setOTP: React.Dispatch<React.SetStateAction<string>>;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const genders = [
    {
      id: 1,
      name: "Male",
    },
    {
      id: 2,
      name: "Female",
    },
  ];

  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("Gender");
  const [openDate, setOpenDate] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const [phone, setPhone] = useState<Value | undefined>();
  const [openDateModal, setOpenDateModal] = useState(false);
  const [dob, setDOB] = useState<Date | undefined>(new Date());
  const [nationality, setNationality] = useState("Nationality");
  const { country } = useSelector((state: RootState) => state.global);
  const [countryList, setCountryList] = useState<SELECT_MENU_ITEM_PROPS[]>([]);

  const handleBlur = () => {
    const parsedPhoneNumber: PhoneNumber = parsePhoneNumber(
      `${phone}`,
      country as Country
    )!;
    if (parsedPhoneNumber.isValid()) {
      return true;
    } else {
      toast.error("Invalid Phone Number!");
      return false;
    }
  };

  const handleSubmission = async () => {
    const formData = new URLSearchParams();
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("phone", phone?.toString()!);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("nationality", nationality);
    formData.append("date_of_birth", dayjs(`${dob}`).format("DD-MM-YYYY"));
    formData.append("customer_source_id", "9");

    try {
      const valid = handleBlur();

      if (valid) {
        const data: any = await register(formData);
        if (!data.error) {
          toast.success("User Registered Successfully!");
          setLogin(true);
          setOpen(false);
          setOpenLogin(false);
          setPhone(undefined);
          setEmail("");
          setLastName("");
          setFirstName("");
          setGender("Gender");
          setNationality("Nationality");
          setDOB(new Date());
          setEmailOrPhone("");
          setOTP("");
        } else {
          toast.error( data?.error?.data?.error || "Something went wrong!");
        }
      } else {
        toast.error("Invalid Phone Number!");
      }
    } catch (err) {
      toast.error("Please Try Again!");
    }
  };

  useEffect(() => {
    fetchCountries(setCountryList);
  }, []);

  return (
    <>
      <DateModal
        date={dob}
        setDate={setDOB}
        open={openDateModal}
        setOpen={setOpenDateModal}
      />
      <DateDrawer
        date={dob}
        open={openDate}
        setDate={setDOB}
        onClose={() => setOpenDate(false)}
      />
      <Modal
        open={open}
        setOpen={setOpen}
        width="w-[90%] sm:w-[75%] md:w-[55%] lg:w-[40%] xl:w-[27.5%] 3xl:w-[20%]"
      >
        <div className="w-full flex flex-col items-center justify-center space-y-5 relative px-5">
          <button type="button" onClick={() => setOpen(false)}>
            <XIcon className="text-accent absolute top-0 right-0 size-5 cursor-pointer" />
          </button>
          <h1 className="w-full text-center text-2xl font-bold">Register</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmission();
            }}
            className="w-full grid grid-cols-2 gap-4 mt-5"
          >
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="col-span-1 w-full p-3 bg-light-primary dark:bg-tertiary text-accent placeholder:text-gray-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="col-span-1 w-full p-3 bg-light-primary dark:bg-tertiary text-accent placeholder:text-gray-500"
            />
            <PhoneInput
              className="col-span-2 w-full p-3 bg-light-primary dark:bg-tertiary text-accent placeholder:text-gray-500"
              defaultCountry={country as Country}
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
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-1 w-full p-3 bg-light-primary dark:bg-tertiary text-accent placeholder:text-gray-500"
            />
            <SelectMenu
              value={gender}
              options={genders}
              setValue={setGender}
              cn="col-span-1 w-full p-3 bg-light-primary dark:bg-tertiary text-accent placeholder:text-gray-500 flex items-center justify-between"
            />
            {countryList && (
              <SelectMenu
                value={nationality}
                options={countryList}
                setValue={setNationality}
                cn="col-span-1 w-full p-3 bg-light-primary dark:bg-tertiary text-accent placeholder:text-gray-500 flex items-center justify-between"
              />
            )}
            <div className="w-full flex flex-col items-center justify-center gap-3">
              <div
                onClick={() => setOpenDate(true)}
                className="w-full flex xl:hidden items-center justify-between text-gray-500 bg-light-primary dark:bg-secondary py-2 px-3"
              >
                <p className="w-full text-left pb-1">
                  {dob ? dayjs(`${dob}`).format("DD/MM/YYYY") : "dd/mm/yyyy"}
                </p>
                <FaChevronDown className="w-4 h-4 text-accent" />
              </div>
              <div
                onClick={() => setOpenDateModal(true)}
                className="w-full xl:flex hidden items-center justify-between text-gray-500 bg-light-primary dark:bg-secondary px-3 py-2.5"
              >
                <p className="w-full text-left pb-1">
                  {dob ? dayjs(`${dob}`).format("DD/MM/YYYY") : "dd/mm/yyyy"}
                </p>
                <FaChevronDown className="w-4 h-4 text-accent" />
              </div>
            </div>
            <p
              onClick={() => {
                setOpen(false);
                setLogin(true);
              }}
              className="col-span-2 w-full text-center font-medium text-xs !my-5"
            >
              Already have an account?&nbsp;
              <span className="text-accent cursor-pointer">Login</span>
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="col-span-2 w-full py-2.5 bg-accent text-white !mt-0 text-sm font-medium"
            >
              {isLoading ? (
                <div className="w-full flex items-center justify-center space-x-3">
                  <LuLoader2 className="w-5 h-5 animate-spin" />
                  <span>Please Wait...</span>
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default RegisterModal;
