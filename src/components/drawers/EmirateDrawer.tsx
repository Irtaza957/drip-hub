import { Drawer } from "vaul";
import XIcon from "@/assets/icons/XIcon";

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

const EmirateDrawer = ({
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
  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white dark:bg-primary text-light-text dark:text-white flex flex-col px-5 pt-5 pb-20 fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <Drawer.Title className="font-medium flex items-center justify-center">
            <p className="w-full text-left text-xl font-bold">Select Emirate</p>
            <button onClick={onClose}>
              <XIcon className="size-6 text-accent" />
            </button>
          </Drawer.Title>
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default EmirateDrawer;
