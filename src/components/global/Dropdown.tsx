import { FaChevronDown } from "react-icons/fa6";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Dropdown = ({
  label,
  value,
  setter,
  options,
}: {
  label: string;
  value?: string;
  options: {
    id: number;
    name: string;
  }[];
  setter?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Menu>
      <MenuButton className="text-white text-xs xl:text-base flex items-center justify-center space-x-2.5">
        <span>{label}</span>
        <FaChevronDown className="size-4 text-accent" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="z-50 w-52 mt-2.5 bg-primary border border-accent/20 px-3 flex flex-col items-center justify-center divide-y divide-accent"
      >
        {options.map((option) => (
          <MenuItem key={option.id} as="div" onClick={() => setter?.(option.name)} className="w-full flex items-center justify-center space-x-2.5 cursor-pointer">
            <div className="w-6 h-6 p-1 border border-accent">
              <div
                className={`w-full h-full ${
                  value === option.name && "bg-accent"
                }`}
              />
            </div>
            <span className="w-full py-3">{option.name}</span>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
