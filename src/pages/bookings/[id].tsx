import LocationIconTwo from "@/assets/icons/LocationIconTwo";
import VisaIcon from "@/assets/icons/VisaIcon";

const BookingDetails = () => {
  return (
    <div className="w-full bg-light-primary dark:bg-secondary text-light-text dark:text-white">
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto p-5 md:px-0 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 py-7 sm:py-14">
        <h1 className="col-span-1 sm:col-span-2 lg:col-span-3 w-full text-left text-xl sm:text-[42px] pt-[75px] sm:pt-[95px]">
          Booking Details
        </h1>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 w-full flex flex-col items-start justify-start gap-5 p-5 bg-white dark:bg-primary border border-[#C9C9C9]/20">
          <div className="w-full flex items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center">
              <p className="w-full text-left text-[18px] font-regular">
                Order ID: 678745
              </p>
              <p className="w-full text-left text-xs font-light">
                01 Jan 2024, 10:00 - 11:00
              </p>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="w-full text-right text-[18px] font-medium">
                Status
              </p>
              <p className="text-right text-[14px] font-light bg-[#71CE3F] px-1 text-white">
                Confirmed
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start">
            {[...Array(8)].map((_, idx) => (
              <div
                className="w-full grid grid-cols-3 py-5 border-b border-accent/50"
                key={idx}
              >
                <div className="col-span-1 w-full flex flex-col items-center justify-center">
                  <p className="w-full text-left text-[20px] overflow-hidden truncate">
                    Rehydration Drip
                  </p>
                  <p className="w-full text-left text-base">500ml</p>
                </div>
                <div className="col-span-1 w-full flex items-center justify-center">
                  <p className="w-full text-center text-[20px]">Qty: 1</p>
                </div>
                <div className="col-span-1 w-full flex items-center justify-center">
                  <p className="w-full text-right text-[20px]">AED 000</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 w-full h-fit flex flex-col items-start justify-start gap-5 bg-white dark:bg-primary p-5 border border-[#C9C9C9]/20">
          <p className="w-full text-left text-[28px]">Summary</p>
          <div className="w-full flex flex-col items-center justify-center gap-1.5">
            <div className="w-full flex items-center justify-center gap-2.5">
              <LocationIconTwo className="size-5 text-accent" />
              <p className="flex-1 text-light-text dark:text-white text-left text-[18px]">Address</p>
            </div>
            <p className="w-full text-left font-light text-base">
              800 pharamcy Drug Store
              <br />
              Near to Al Khalil Mall, Al Quoz
              <br />
              Street 24A, Dubai, UAE +971-55-7559446
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-center">
              <p className="w-full text-left text-[18px]">Sub Total</p>
              <p className="w-full text-right text-[18px]">AED 000</p>
            </div>
            <div className="w-full flex items-center justify-center pb-2.5 border-b border-accent/50">
              <p className="w-full text-left text-[18px]">Discount</p>
              <p className="w-full text-right text-[18px]">AED 000</p>
            </div>
            <div className="w-full flex items-center justify-center pt-2.5">
              <p className="w-full text-left text-[20px]">Grand Total</p>
              <p className="w-full text-right text-[20px]">AED 000</p>
            </div>
            <div className="w-full flex flex-col items-center justify-center py-5">
              <p className="w-full text-left text-[18px] font-semibold">
                Payment Method
              </p>
              <p className="w-full text-left text-xs font-medium pt-3.5">
                Card Payment
              </p>
              <div className="w-full flex items-center justify-center">
                <div className="w-full flex items-center justify-center gap-3.5">
                  <VisaIcon className="size-6" />
                  <p className="flex-1 text-left text-[14px] mb-0.5">
                    xxxx-2456
                  </p>
                </div>
                <div className="w-full flex items-end justify-end">
                  <p className="text-right text-[14px] font-light bg-[#71CE3F] px-1 text-white">
                    Completed
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-2.5 pt-5">
                <button
                  type="button"
                  className="w-full pt-1.5 pb-2 text-[20px] bg-accent text-white"
                >
                  Update Booking
                </button>
                <button
                  type="button"
                  className="w-full pt-1.5 pb-2 text-[20px] bg-light-primary dark:bg-secondary text-accent"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
