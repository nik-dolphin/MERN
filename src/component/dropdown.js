import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Dropdown(props) {
  const { data } = props;

  return (
    <Menu as="div" className="relative inline-block text-left w-11">
      <div className="w-full">
        <MenuButton className="w-full">{data.buttonData}</MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {data?.list?.length &&
            data?.list.map((item, i) => (
              <MenuItem key={i}>
                <div
                  onClick={item?.onclick}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 cursor-pointer"
                >
                  {item?.label}
                </div>
              </MenuItem>
            ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
