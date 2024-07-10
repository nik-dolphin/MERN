import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SelectInput = ({ list = [], selected, setSelected, placeholder }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-pointer rounded-md bg-gray-50 p-2.5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 sm:text-sm sm:leading-6">
              <span className="flex items-center justify-between">
                <span className="block truncate">
                  {selected.label || placeholder}
                </span>
                {open ? (
                  <MdKeyboardArrowUp size={20} />
                ) : (
                  <MdKeyboardArrowDown size={20} />
                )}
              </span>
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10 mt-12 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              {list?.map((item) => (
                <ListboxOption
                  key={item.value}
                  className={({ focus }) =>
                    classNames(
                      focus ? "bg-gray-200" : "",
                      !focus ? "text-gray-900" : "",
                      "relative select-none py-2 pl-3 pr-9 cursor-pointer"
                    )
                  }
                  value={item}
                >
                  {({ selected, focus }) => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "ml-3 block truncate"
                          )}
                        >
                          {item.label}
                        </span>
                      </div>
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectInput;
