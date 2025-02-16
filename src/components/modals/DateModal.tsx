import Modal from "../global/Modal";
import { DayPicker } from "react-day-picker";

interface DateModalProps {
  open: boolean;
  date: Date | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  shouldDisablePastDates?: boolean;
}

const DateModal = ({ open, date, setDate, setOpen, shouldDisablePastDates }: DateModalProps) => {
  return (
    <Modal width="w-fit" open={open} setOpen={setOpen}>
      <div className="w-full bg-white dark:bg-primary text-light-text dark:text-white flex flex-col items-center justify-center">
        <DayPicker mode="single" selected={date} onSelect={setDate} disabled={shouldDisablePastDates ? [{ before: new Date() }] : []} />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="w-2/3 py-2 mb-5 bg-accent text-white font-medium"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default DateModal;
