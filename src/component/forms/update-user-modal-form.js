import React, { useEffect, useState } from "react";
import { userRoleList } from "../../utility/utils";
import SelectInput from "../select-input";

const UpdateUserModalForm = ({ setSelectedRowData, selectedRowData }) => {
  const [selected, setSelected] = useState(
    userRoleList.find((item) => item.value === selectedRowData.role)
  );

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSelectedRowData({
      ...selectedRowData,
      [name]: value,
    });
  };
  useEffect(() => {
    setSelectedRowData({
      ...selectedRowData,
      role: selected?.value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div>
      <form className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            value={selectedRowData.username}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required=""
            value={selectedRowData.email}
            onChange={handleChangeInput}
          />
        </div>
        <div className="relative inline-block w-full">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Type
          </label>
          <SelectInput
            list={userRoleList}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateUserModalForm;
