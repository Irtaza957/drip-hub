import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const LinkDropdown = ({
  label,
  options,
}: {
  label: string;
  options: {
    id: number;
    name: string;
    link: string;
    selection: number | null;
  }[];
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
        className="z-50 w-52 mt-2.5 bg-primary border border-accent/20 flex flex-col items-center justify-center divide-y divide-accent"
      >
        {options.map((option) => (
          <MenuItem
            as="div"
            key={option.id}
            className="w-full flex items-center justify-center px-3 space-x-2.5 cursor-pointer hover:bg-tertiary"
          >
            <Link href={option.link} className="w-full py-3">
              {option.name}
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default LinkDropdown;
