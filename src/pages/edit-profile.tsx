"use client";

import dayjs from "dayjs";
import Image from "next/image";
import PhoneInput, {
  Value,
  // Country,
  PhoneNumber,
  parsePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { FaChevronDown, FaPencil } from "react-icons/fa6";

import { RootState } from "@/store";
import "react-phone-number-input/style.css";
import DateModal from "@/components/modals/DateModal";
import DateDrawer from "@/components/drawers/DateDrawer";
import GenderModal from "@/components/modals/GenderModal";
import GenderDrawer from "@/components/drawers/GenderDrawer";
import { useUpdateUserMutation } from "@/store/services/auth";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [phone, setPhone] = useState<Value | undefined>();
  const [openDateModal, setOpenDateModal] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [openGenderModal, setOpenGenderModal] = useState(false);
  const [date, setDate] = useState<Date | string | undefined>(new Date());
  const { user } = useSelector((state: RootState) => state.global);

  // eslint-disable-next-line no-unused-vars
  const handleBlur = () => {
    const parsedPhoneNumber: PhoneNumber = parsePhoneNumber(`${phone}`, "AE")!;
    if (parsedPhoneNumber.isValid()) {
      return true;
    } else {
      toast.error("Invalid Phone Number!");
      return false;
    }
  };

  const handleSubmit = async () => {
    const valid = handleBlur();

    if (valid) {
      const userData = new URLSearchParams();
      userData.append("email", email);
      userData.append("gender", gender);
      userData.append("is_allergy", "0");
      userData.append("lastname", lastName);
      userData.append("firstname", firstName);
      userData.append("allergy_description", "");
      userData.append("customer_id", user?.customer_id?.toString()!);
      userData.append("date_of_birth", dayjs(date).format("DD-MM-YYYY"));

      const data = await updateUser({
        data: userData,
        token: user?.token,
      });

      if (data.error) {
        toast.error("Something went wrong!");
      } else {
        toast.success("Profile Updated Successfully!");
      }
    } else {
      toast.error("Invalid Phone Number!");
    }
  };

  useEffect(() => {
    if (user) {
      setEmail(user?.email!);
      setFirstName(user?.firstname!);
      setLastName(user?.lastname!);
      setPhone(user?.phone! as Value);
      setGender(user?.gender!);
      setDate(user?.date_of_birth);
    }
  }, [user]);

  return (
    <div className="w-full bg-light-primary dark:bg-secondary">
      <DateDrawer
        date={date as Date}
        open={openDate}
        setDate={setDate as React.Dispatch<React.SetStateAction<Date | undefined>>}
        onClose={() => setOpenDate(false)}
      />
      <GenderDrawer
        value={gender}
        open={openGender}
        setter={setGender}
        onClose={() => setOpenGender(false)}
      />
      <GenderModal
        value={gender}
        setter={setGender}
        open={openGenderModal}
        setOpen={setOpenGenderModal}
      />
      <DateModal
        date={date as Date}
        setDate={setDate as React.Dispatch<React.SetStateAction<Date | undefined>>}
        open={openDateModal}
        setOpen={setOpenDateModal}
      />
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto p-5 md:px-0 flex flex-col items-center justify-center space-y-5 pt-[75px] sm:pt-[95px] pb-72 3xl:pb-[500px] text-light-text dark:text-white">
        <h1 className="w-full text-left text-2xl font-light">Edit Profile</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full p-5 grid grid-cols-1 sm:grid-cols-2 gap-5 bg-white dark:bg-primary"
        >
          <div className="col-span-1 sm:col-span-2 relative w-24 h-24 bg-light-primary dark:bg-tertiary p-1.5 mr-auto">
            <Image
              src={user?.image || "https://ui.shadcn.com/avatars/04.png"}
              alt="profile"
              width={80}
              height={80}
              className="w-full h-full"
            />
            <FaPencil className="w-6 h-6 bg-green-500 text-white p-1 absolute bottom-0 left-0" />
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-3">
            <label htmlFor="name" className="w-full text-left text-xs">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border border-light-primary dark:border-tertiary bg-light-primary dark:bg-secondary text-gray-500 placeholder:text-gray-500"
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-3">
            <label htmlFor="name" className="w-full text-left text-xs">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border border-light-primary dark:border-tertiary bg-light-primary dark:bg-secondary text-gray-500 placeholder:text-gray-500"
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-3">
            <label htmlFor="phone" className="w-full text-left text-xs">
              Phone Number
            </label>
            <PhoneInput
              className="w-full p-3 border border-light-primary dark:border-tertiary bg-light-primary dark:bg-secondary text-gray-500 placeholder:text-gray-500"
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
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-3">
            <label htmlFor="email" className="w-full text-left text-xs">
              Email ID
            </label>
            <input
              type="email"
              value={email}
              placeholder={user?.email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-light-primary dark:border-tertiary bg-light-primary dark:bg-secondary text-gray-500 placeholder:text-gray-500"
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-3">
            <label htmlFor="gender" className="w-full text-left text-xs">
              Gender
            </label>
            <div
              onClick={() => setOpenGender(true)}
              className="w-full flex sm:hidden items-center justify-between text-gray-500 bg-light-primary dark:bg-secondary p-3"
            >
              <p className="w-full text-left pb-1">
                {gender ? gender : "Select Gender"}
              </p>
              <FaChevronDown className="w-4 h-4 text-accent" />
            </div>
            <div
              onClick={() => setOpenGenderModal(true)}
              className="w-full sm:flex hidden items-center justify-between text-gray-500 bg-light-primary dark:bg-secondary p-3"
            >
              <p className="w-full text-left pb-1">
                {gender ? gender : "Select Gender"}
              </p>
              <FaChevronDown className="w-4 h-4 text-accent" />
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-3">
            <label htmlFor="dob" className="w-full text-left text-xs">
              Date of Birth
            </label>
            <div
              onClick={() => setOpenDate(true)}
              className="w-full flex sm:hidden items-center justify-between text-gray-500 bg-light-primary dark:bg-secondary p-3"
            >
              <p className="w-full text-left pb-1">
                {date ? dayjs(date).format("DD/MM/YYYY") : "dd/mm/yyyy"}
              </p>
              <FaChevronDown className="w-4 h-4 text-accent" />
            </div>
            <div
              onClick={() => setOpenDateModal(true)}
              className="w-full sm:flex hidden items-center justify-between text-gray-500 bg-light-primary dark:bg-secondary p-3"
            >
              <p className="w-full text-left pb-1">
                {date ? dayjs(date).format("DD/MM/YYYY") : "dd/mm/yyyy"}
              </p>
              <FaChevronDown className="w-4 h-4 text-accent" />
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 w-full flex items-center justify-center">
            <button
              type="submit"
              className="w-full sm:w-1/3 py-3 bg-accent text-white text-center"
            >
              {isLoading ? (
                <div className="w-full flex items-center justify-center gap-3">
                  <LuLoader2 className="size-5 animate-spin" />
                  <span>Please Wait...</span>
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
