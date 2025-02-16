import Modal from "../global/Modal";

interface GenderModalProps {
  open: boolean;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GenderModal = ({ open, value, setter, setOpen }: GenderModalProps) => {
  const genders = [
    {
      id: 1,
      name: "Male",
    },
    {
      id: 2,
      name: "Female",
    },
    {
      id: 3,
      name: "Prefer not to Say",
    },
  ];

  return (
    <Modal width="w-fit" open={open} setOpen={setOpen}>
      <div className="w-full bg-white dark:bg-primary text-light-text dark:text-white flex flex-col items-center justify-center">
        {genders.map((g, idx) => (
          <div
            key={g.id}
            onClick={() => setter(g.name)}
            className={`w-full flex items-center justify-start space-x-5 p-5 cursor-pointer ${
              idx !== genders.length - 1 && "border-b border-accent"
            }`}
          >
            <div className="w-6 h-6 p-1 border border-accent">
              <div
                className={`w-full h-full ${value === g.name && "bg-accent"}`}
              />
            </div>
            <span>{g.name}</span>
          </div>
        ))}
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="w-full bg-accent text-white py-2.5 font-semibold mt-5"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default GenderModal;
