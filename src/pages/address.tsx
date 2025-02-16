"use client";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { LuLoader2 } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

import {
  useFetchAreasQuery,
  useFetchAddressQuery,
  usePostAddressMutation,
  useUpdateAddressMutation,
} from "@/store/services/address";
import { RootState } from "@/store";
import LabelModal from "@/components/modals/LabelModal";
import LabelDrawer from "@/components/drawers/LabelDrawer";
import EmirateModal from "@/components/modals/EmirateModal";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import EmirateDrawer from "@/components/drawers/EmirateDrawer";
import { useRouter } from "next/router";

const emirates = [
  {
    id: 1,
    name: "Dubai",
  },
  {
    id: 2,
    name: "Abu Dhabi",
  },
  {
    id: 3,
    name: "Sharjah",
  },
  {
    id: 4,
    name: "Ajman",
  },
  {
    id: 5,
    name: "Umm Al Quwain",
  },
  {
    id: 6,
    name: "Ras Al Khaimah",
  },
  {
    id: 7,
    name: "Fujairah",
  },
  {
    id: 8,
    name: "Al Ain",
  },
];

const Address = () => {
  const areaRef = useRef(null);
  const [type, setType] = useState<string>("");
  const { user, selectedAddress } = useSelector(
    (state: RootState) => state.global
  );
  const [building, setBuilding] = useState<string>("");
  useOnClickOutside(areaRef, () => setToggleArea(false));
  const [apartment, setApartment] = useState<string>("");
  const [emirate, setEmirate] = useState<string>("Dubai");
  const { data: areaData } = useFetchAreasQuery(
    emirates.filter((e) => e.name === emirate)[0]?.id,
    {
      skip: !emirate,
    }
  );
  const [area, setArea] = useState<string>("Business Bay");
  const { data } = useFetchAddressQuery(selectedAddress, {
    refetchOnMountOrArgChange: true,
    skip: !selectedAddress || selectedAddress === "",
  });
  const [postAddress, { isLoading }] = usePostAddressMutation();
  const [extraDirections, setExtraDirections] = useState<string>("");
  const [areaList, setAreaList] = useState<SELECT_MENU_ITEM_PROPS[]>([]);
  const [updateAddress, { isLoading: updating }] = useUpdateAddressMutation();

  const [openLabel, setOpenLabel] = useState(false);
  const [toggleArea, setToggleArea] = useState(false);
  const [openEmirate, setOpenEmirate] = useState(false);
  const [openLabelModal, setOpenLabelModal] = useState(false);
  const [openEmirateModal, setOpenEmirateModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const formData = new URLSearchParams();
    formData.append("lat", "0.00");
    formData.append("lng", "0.00");
    formData.append("street", "N/A");
    formData.append("map_link", "FFF");
    formData.append("is_default", "0");
    formData.append("address_type", type);
    formData.append("apartment", apartment);
    formData.append("building_no", building);
    formData.append("extra_direction", extraDirections);
    formData.append(
      "area_id",
      areaList.filter((a) => a.name === area)[0].id.toString()
    );

    if (selectedAddress) {
      formData.append("address_id", selectedAddress);
    } else {
      formData.append("customer_id", user?.customer_id!);
    }

    let data = null;

    try {
      if (selectedAddress) {
        data = await updateAddress(formData);
      } else {
        data = await postAddress(formData);
      }

      if (data.error) {
        toast.error("Please Try Again!");
      } else {
        toast.success(
          `Address ${selectedAddress ? "Updated" : "Added"} Successfully!`
        );
        setApartment("");
        setBuilding("");
        setExtraDirections("");
        setEmirate("Dubai");
        setArea("Business Bay");
        setType("");
        router.push("/profile");
      }
    } catch (err) {
      toast.error("Please Try Again!");
    }
  };

  useEffect(() => {
    if (areaData) {
      const list = areaData.map((area) => {
        return {
          id: parseInt(area.area_id),
          name: area.area,
        };
      });

      setAreaList(list!);
    }
  }, [emirate, areaData]);

  useEffect(() => {
    if (data) {
      setType(data.address_type);
      setApartment(data.apartment);
      setBuilding(data.building_no!);
      setExtraDirections(data.extra_direction);
      setEmirate(emirates.filter((e) => e.name === emirate)[0].name);
    }
  }, [data]);

  return (
    <div className="w-full bg-light-primary dark:bg-secondary text-light-text dark:text-white">
      <LabelDrawer
        value={type}
        open={openLabel}
        setter={setType}
        onClose={() => setOpenLabel(false)}
      />
      <EmirateDrawer
        value={emirate}
        open={openEmirate}
        setter={setEmirate}
        onClose={() => setOpenEmirate(false)}
      />
      <LabelModal
        value={type}
        setter={setType}
        open={openLabelModal}
        setOpen={setOpenLabelModal}
      />
      <EmirateModal
        value={emirate}
        setter={setEmirate}
        open={openEmirateModal}
        setOpen={setOpenEmirateModal}
      />
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto p-5 md:px-0 flex flex-col items-center justify-center space-y-5 pt-[75px] sm:pt-[95px] pb-72 3xl:pb-[500px]">
        <h1 className="w-full text-left text-2xl font-light">
          {selectedAddress || selectedAddress !== "" ? "Update" : "New"} Address
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full bg-white dark:bg-primary p-3 grid grid-cols-2 gap-3"
        >
          <div className="col-span-2 w-full flex flex-col items-center justify-center space-y-3">
            <label htmlFor="label" className="w-full text-left text-xs">
              Address Label
            </label>
            <div
              onClick={() => setOpenLabel(true)}
              className="w-full flex sm:hidden items-center justify-between text-gray-500 bg-light-primary dark:bg-secondary p-3"
            >
              <p className="w-full text-left pb-1">{type ? type : "Select"}</p>
              <FaChevronDown className="w-4 h-4 text-accent" />
            </div>
            <div
              onClick={() => setOpenLabelModal(true)}
              className="w-full sm:flex hidden items-center justify-between text-gray-500 bg-light-primary dark:bg-secondary p-3"
            >
              <p className="w-full text-left pb-1">{type ? type : "Select"}</p>
              <FaChevronDown className="w-4 h-4 text-accent" />
            </div>
          </div>
          <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-3">
            <label htmlFor="emirate" className="w-full text-left text-xs">
              Select Emirate
            </label>
            <div
              onClick={() => setOpenEmirate(true)}
              className="w-full flex sm:hidden items-center justify-between text-gray-500 bg-light-primary dark:bg-secondary p-3"
            >
              <p className="w-full text-left pb-1">
                {emirate ? emirate : "Select"}
              </p>
              <FaChevronDown className="w-4 h-4 text-accent" />
            </div>
            <div
              onClick={() => setOpenEmirateModal(true)}
              className="w-full sm:flex hidden items-center justify-between text-gray-500 bg-light-primary dark:bg-secondary p-3"
            >
              <p className="w-full text-left pb-1">
                {emirate ? emirate : "Select"}
              </p>
              <FaChevronDown className="w-4 h-4 text-accent" />
            </div>
          </div>
          {areaList?.length !== 0 && (
            <div className="relative col-span-1 w-full flex flex-col items-start justify-start space-y-3">
              <label htmlFor="area" className="w-full text-left text-xs">
                Select Area
              </label>
              <div
                onClick={() => setToggleArea(!toggleArea)}
                className="w-full flex items-center justify-between text-gray-500 bg-light-primary dark:bg-secondary p-3"
              >
                <p className="w-full text-left pb-1 overflow-hidden truncate">
                  {area ? area : "Select"}
                </p>
                <FaChevronDown className="w-4 h-4 text-accent" />
              </div>
              {toggleArea && (
                <div
                  ref={areaRef}
                  className="z-10 absolute w-full top-[75px] left-0 bg-white dark:bg-primary border border-accent/50 divide-y divide-accent/50"
                >
                  {areaList?.map((item, idx) => (
                    <p
                      onClick={() => {
                        setArea(item.name);
                        setToggleArea(false);
                      }}
                      key={idx}
                      className="w-full p-2.5 hover:dark:bg-tertiary hover:bg-light-primary text-left text-xs cursor-pointer"
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-3">
            <label htmlFor="number" className="w-full text-left text-xs">
              Apartment/Villa
            </label>
            <input
              type="text"
              value={apartment}
              placeholder="Villa"
              onChange={(e) => setApartment(e.target.value)}
              className="w-full text-gray-500 placeholder:text-gray-500 bg-light-primary dark:bg-secondary p-3"
            />
          </div>
          <div className="col-span-1 w-full flex flex-col items-center justify-center space-y-3">
            <label htmlFor="street" className="w-full text-left text-xs">
              Building/Street
            </label>
            <input
              type="text"
              value={building}
              placeholder="Street"
              onChange={(e) => setBuilding(e.target.value)}
              className="w-full text-gray-500 placeholder:text-gray-500 bg-light-primary dark:bg-secondary p-3"
            />
          </div>
          <div className="col-span-2 w-full flex flex-col items-center justify-center space-y-3">
            <label htmlFor="extra" className="w-full text-left text-xs">
              Extra Directions
            </label>
            <textarea
              rows={5}
              value={extraDirections}
              onChange={(e) => setExtraDirections(e.target.value)}
              className="w-full text-gray-500 placeholder:text-gray-500 bg-light-primary dark:bg-secondary p-3"
            />
          </div>
          <button
            disabled={isLoading || updating}
            type="submit"
            className="col-span-2 w-full sm:w-1/3 mx-auto py-3 bg-accent text-white !mt-10"
          >
            {isLoading || updating ? (
              <div className="w-full flex items-center justify-center gap-3">
                <LuLoader2 className="size-5 animate-spin" />
                <span>Please Wait...</span>
              </div>
            ) : (
              "Confirm"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
