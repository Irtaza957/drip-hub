import Modal from "../global/Modal";

interface LabelModalProps {
  open: boolean;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LabelModal = ({ open, value, setter, setOpen }: LabelModalProps) => {
  const labels = [
    {
      id: 1,
      name: "Home",
    },
    {
      id: 2,
      name: "Work",
    },
  ];

  return (
    <Modal width="w-fit" open={open} setOpen={setOpen}>
      <div className="w-full bg-white dark:bg-primary text-light-text dark:text-white flex flex-col items-center justify-center">
        {labels.map((l, idx) => (
          <div
            key={l.id}
            onClick={() => setter(l.name)}
            className={`w-full flex items-center justify-start space-x-5 py-5 cursor-pointer ${
              idx !== labels.length - 1 && "border-b border-accent"
            }`}
          >
            <div className="w-6 h-6 p-1 border border-accent">
              <div
                className={`w-full h-full ${value === l.name && "bg-accent"}`}
              />
            </div>
            <span>{l.name}</span>
          </div>
        ))}
        <div className="w-full flex items-center justify-center space-x-3 divide-x divide-gray-500  ">
          <span>Other</span>
          <input
            type="text"
            placeholder="Enter Label"
            className="w-full p-3 bg-transparent"
            onChange={(e) => setter(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="bg-accent text-white w-full py-2.5 font-semibold mt-10"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default LabelModal;
