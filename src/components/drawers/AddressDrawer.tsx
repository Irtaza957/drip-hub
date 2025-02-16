import { Drawer } from "vaul";
import XIcon from "@/assets/icons/XIcon";

const AddressDrawer = ({
  open,
  value,
  setter,
  onClose,
  addresses,
}: {
  open: boolean;
  value: string;
  onClose: () => void;
  addresses: ADDRESS[];
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
            <p className="w-full text-left text-xl">Select Address</p>
            <button onClick={onClose}>
              <XIcon className="size-6 text-accent" />
            </button>
          </Drawer.Title>
          {addresses?.map((a, idx) => (
            <div
              key={a.address_id}
              onClick={() => {
                setter(a.address_id!);
                onClose();
              }}
              className={`w-full flex items-center justify-start space-x-5 py-5 cursor-pointer ${
                idx !== addresses.length - 1 && "border-b border-accent"
              }`}
            >
              <div className="w-6 h-6 p-1 border border-accent">
                <div
                  className={`w-full h-full ${
                    value === a.address_id && "bg-accent"
                  }`}
                />
              </div>
              <span>
                {a.apartment && a.apartment}
                ,&nbsp;
                {a.building_no && a.building_no}
                ,&nbsp;
                {a.area && a.area}
              </span>
            </div>
          ))}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default AddressDrawer;
