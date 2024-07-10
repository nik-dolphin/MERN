import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const CustomPasswordInput = ({ label, name, id, value, onchange }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={isShow ? "text" : "password"}
          name={name}
          id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="••••••••"
          value={value}
          onChange={onchange}
        />
        <div className="absolute inset-y-0 end-0 flex items-center pe-3.5">
          <div className="cursor-pointer" onClick={() => setIsShow(!isShow)}>
            {isShow ? <IoEye /> : <IoEyeOff />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPasswordInput;
