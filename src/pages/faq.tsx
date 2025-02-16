import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const FAQ = () => {
  return (
    <div className="w-full bg-light-primary dark:bg-secondary text-light-text dark:text-white">
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto p-5 md:px-0 flex flex-col items-center justify-center space-y-5 mt-[60px] sm:mt-[80px]">
        <h1 className="w-full text-left text-[22px]">FAQs</h1>
        {[...Array(8)].map((_, idx) => (
          <Disclosure
            as="div"
            key={idx}
            className="w-full p-2.5 border border-accent/20 flex flex-col items-center justify-center space-y-2.5"
            defaultOpen={false}
          >
            {({ open }) => (
              <>
                <DisclosureButton className="flex w-full items-center justify-between">
                  <span className="text-[14px] font-medium">
                    Lorem ipsum dolor sit amet?
                  </span>
                  {open ? (
                    <FaMinus className="size-8 border border-accent p-1 text-accent" />
                  ) : (
                    <FaPlus className="size-8 border border-accent p-1 text-accent" />
                  )}
                </DisclosureButton>
                <DisclosurePanel className="text-xs font-light w-full text-left">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Facere ab neque dolorem maxime fugiat velit odio quas
                  asperiores blanditiis aspernatur?
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
