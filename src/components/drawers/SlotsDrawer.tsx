import XIcon from "@/assets/icons/XIcon";

import { Drawer } from "vaul";
import { TbMoodEmpty } from "react-icons/tb";

interface SlotsDrawerProps {
  open: boolean;
  slots: string[];
  onClose: () => void;
  selectedSlot: string;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string>>;
}

const SlotsDrawer = ({
  open,
  slots,
  onClose,
  selectedSlot,
  setSelectedSlot,
}: SlotsDrawerProps) => {
  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white dark:bg-primary text-light-text dark:text-white flex flex-col items-center justify-center space-y-5 p-5 fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <Drawer.Title className="w-full font-medium flex items-center justify-center">
            <p className="w-full text-left text-xl">Select Time Slot</p>
            <button type="button" onClick={onClose}>
              <XIcon className="size-6 text-accent" />
            </button>
          </Drawer.Title>
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
                  onClick={() => {
                    setSelectedSlot(slot);
                    onClose();
                  }}
                  className={`w-full px-4 py-2 border border-accent cursor-pointer transition-all duration-150 ease-linear ${
                    selectedSlot === slot && "bg-accent text-white"
                  }`}
                >
                  {slot}
                </p>
              ))
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SlotsDrawer;
