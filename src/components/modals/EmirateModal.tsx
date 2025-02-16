import Modal from "../global/Modal";

interface EmirateModalProps {
  open: boolean;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmirateModal = ({ open, value, setter, setOpen }: EmirateModalProps) => {
  const emirates = [
    {
      id: 1,
      name: "Abu Dhabi",
    },
    {
      id: 2,
      name: "Dubai",
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
  ];

  return (
    <Modal width="w-[400px]" open={open} setOpen={setOpen}>
      <div className="w-full bg-white dark:bg-primary text-light-text dark:text-white flex flex-col items-center justify-center">
        {emirates.map((e, idx) => (
          <div
            key={e.id}
            onClick={() => setter(e.name)}
            className={`w-full flex items-center justify-start space-x-5 py-5 cursor-pointer ${
              idx !== emirates.length - 1 && "border-b border-accent"
            }`}
          >
            <div className="w-6 h-6 p-1 border border-accent">
              <div
                className={`w-full h-full ${value === e.name && "bg-accent"}`}
              />
            </div>
            <span>{e.name}</span>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="bg-accent text-white w-full py-2.5 font-semibold mt-5"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default EmirateModal;
