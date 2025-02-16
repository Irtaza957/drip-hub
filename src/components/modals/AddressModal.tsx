import Modal from "../global/Modal";

interface AddressModalProps {
  open: boolean;
  value: string;
  addresses: ADDRESS[];
  setter: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressModal = ({
  open,
  value,
  setter,
  setOpen,
  addresses,
}: AddressModalProps) => {
  return (
    <Modal
      width="w-[67.5%] md:w-[50%] lg:w-[37.5%] xl:w-[25%] 3xl:w-[20%]"
      open={open}
      setOpen={setOpen}
    >
      <div className="w-full bg-white dark:bg-primary text-light-text dark:text-white flex flex-col items-center justify-center">
        {addresses?.map((a, idx) => (
          <div
            key={a.address_id}
            onClick={() => setter(a.address_id!)}
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
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="bg-accent text-white w-1/3 py-2.5 font-semibold mt-5"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default AddressModal;
