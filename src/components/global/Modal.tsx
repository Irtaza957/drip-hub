import { Dialog, DialogPanel } from "@headlessui/react";

const Modal = ({
  open,
  width,
  setOpen,
  children,
}: {
  open: boolean;
  width?: string;
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={() => setOpen(false)}
    >
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={`${
              width ? width : "w-full"
            } bg-white dark:bg-primary text-light-text dark:text-white p-3 flex items-center justify-center border border-accent/20 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0`}
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
