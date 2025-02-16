import { Drawer } from "vaul";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

interface DateDrawerProps {
  open: boolean;
  onClose: () => void;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DateDrawer = ({ open, date, setDate, onClose }: DateDrawerProps) => {
  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="w-full bg-white dark:bg-primary text-light-text dark:text-white flex flex-col items-center justify-center fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <DayPicker mode="single" selected={date} onSelect={setDate} />
          <button
            type="button"
            onClick={onClose}
            className="w-2/3 py-2 mb-5 bg-accent text-white font-medium"
          >
            Confirm
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DateDrawer;
