import { Drawer } from "vaul";
import XIcon from "@/assets/icons/XIcon";
import AutoComplete from "../global/AutoComplete";

const SearchDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer.Root open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-50"
        />
        <Drawer.Content className="bg-white dark:bg-primary flex flex-col px-5 pt-5 pb-20 fixed bottom-0 left-0 right-0 z-50 focus-visible:outline-none">
          <Drawer.Title className="font-medium flex items-center justify-end">
            <button onClick={onClose}>
              <XIcon className="size-6 text-accent" />
            </button>
          </Drawer.Title>
          <div className="w-full h-[calc(100vh-200px)] py-5">
            <AutoComplete trigger={onClose} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SearchDrawer;
