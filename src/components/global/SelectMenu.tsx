import {
  Listbox,
  Transition,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { FaChevronDown } from "react-icons/fa6";

const SelectMenu = ({ cn, value, options, setValue }: SELECT_MENU_PROPS) => {
  return (
    <Listbox
      as="div"
      value={value}
      onChange={setValue}
      className="relative w-full"
    >
      <ListboxButton
        className={`${
          cn ? cn : "px-3 pb-3 w-full border-b flex items-center justify-center"
        }`}
      >
        <p className="w-full text-left">{value}</p>
        <FaChevronDown className="w-4 h-4" />
      </ListboxButton>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ListboxOptions className="absolute mt-1 w-full z-10 max-h-52 overflow-y-auto bg-secondary border border-accent/20 text-base shadow-lg px-3 pb-3">
          {options.map((option: SELECT_MENU_ITEM_PROPS) => (
            <ListboxOption
              key={option.id}
              value={option.name}
              className={`w-full text-xs text-left border-accent/50 ${
                option.id === options.length
                  ? "border-none pt-3"
                  : "border-b py-3"
              }`}
            >
              {option.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Transition>
    </Listbox>
  );
};

export default SelectMenu;
