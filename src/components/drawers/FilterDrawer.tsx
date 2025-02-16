import { Drawer } from "vaul";
import XIcon from "@/assets/icons/XIcon";

const FilterDrawer = ({
  open,
  value,
  setter,
  onClose,
}: {
  open: boolean;
  value: string;
  onClose: () => void;
  setter: React.Dispatch<React.SetStateAction<string>>;
}) => {
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

  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white dark:bg-primary text-light-text dark:text-white flex flex-col px-5 pt-5 fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <Drawer.Title className="font-medium flex items-center justify-center">
            <p className="w-full text-left text-xl">Sort By</p>
            <button onClick={onClose}>
              <XIcon className="size-6 text-accent" />
            </button>
          </Drawer.Title>
          {filters.map((f, idx) => (
            <div
              key={f.id}
              onClick={() => {
                setter(f.name);
                onClose();
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default FilterDrawer;
