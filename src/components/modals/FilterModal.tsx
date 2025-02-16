import Modal from "../global/Modal";

interface FilterModalProps {
  open: boolean;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const filters = [
  {
    id: 1,
    name: "Price (High to Low)",
  },
  {
    id: 2,
    name: "Price (Low to High)",
  },
  {
    id: 3,
    name: "Most Popular",
  },
  {
    id: 4,
    name: "Best Selling",
  },
  {
    id: 5,
    name: "DripHub Choice",
  },
];

const FilterModal = ({ open, value, setter, setOpen }: FilterModalProps) => {
  return (
    <Modal width="w-full xl:w-[25%]" open={open} setOpen={setOpen}>
      <div className="w-full bg-white dark:bg-primary flex flex-col items-center justify-center">
        {filters.map((f, idx) => (
          <div
            key={f.id}
            onClick={() => {
              setter(f.name);
              setOpen(false);
            }}
            className={`w-full flex items-center justify-start space-x-5 py-5 cursor-pointer ${
              idx !== filters.length - 1 && "border-b border-accent"
            }`}
          >
            <div className="w-6 h-6 p-1 border border-accent">
              <div
                className={`w-full h-full ${value === f.name && "bg-accent"}`}
              />
            </div>
            <span>{f.name}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default FilterModal;
