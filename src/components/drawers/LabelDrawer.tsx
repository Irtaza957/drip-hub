import { Drawer } from "vaul";
import XIcon from "@/assets/icons/XIcon";

const LabelDrawer = ({
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
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white dark:bg-primary text-light-text dark:text-white flex flex-col p-5 fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <Drawer.Title className="font-medium flex items-center justify-center">
            <p className="w-full text-left text-xl font-bold">Address Label</p>
            <button onClick={onClose}>
              <XIcon className="size-6 text-accent" />
            </button>
          </Drawer.Title>
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
            onClick={onClose}
            className="w-full py-2 text-white bg-accent mt-10 font-medium"
          >
            Confirm
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default LabelDrawer;
