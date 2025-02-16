import Modal from "../global/Modal";
import { TbMoodEmpty } from "react-icons/tb";

interface SlotsModalProps {
  open: boolean;
  slots: string[];
  selectedSlot: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string>>;
}

const SlotsModal = ({
  open,
  slots,
  setOpen,
  selectedSlot,
  setSelectedSlot,
}: SlotsModalProps) => {
  return (
    <Modal
      width="w-[75%] md:w-[50%] lg:w-[35%] 3xl:w-[20%]"
      open={open}
      setOpen={setOpen}
    >
      <div className="w-full bg-white dark:bg-primary text-light-text dark:text-white flex flex-col items-center justify-center">
        <div className="w-full grid grid-cols-2 gap-3">
          {slots.length === 0 ? (
            <div className="col-span-2 w-full flex flex-col items-center justify-center space-y-3">
              <TbMoodEmpty className="w-14 h-14 text-accent" />
              <p className="w-full text-lg font-semibold text-center text-accent">
                No More Slots for the Day. Please Check in Tommorow.
              </p>
            </div>
          ) : (
            slots.map((slot, idx) => (
              <p
                key={idx}
                onClick={() => setSelectedSlot(slot)}
                className={`w-full px-4 py-2 border border-accent cursor-pointer transition-all duration-150 ease-linear ${
                  selectedSlot === slot && "bg-accent text-white"
                }`}
              >
                {slot}
              </p>
            ))
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="bg-accent text-white w-1/3 py-2.5 font-semibold mt-5"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default SlotsModal;
