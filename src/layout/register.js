import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axios-client";
import SelectInput from "../component/select-input";
import { userRoleList } from "../utility/utils";
import CustomPasswordInput from "../component/custom-password-input";

const Register = () => {
  let navigate = useNavigate();
  const [selected, setSelected] = useState(userRoleList[0]);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "0",
    password: "",
    confirm_password: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post(`/register`, userData)
      .then((res) => {
        if (res?.statusText === "OK") {
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log("__error", error);
        enqueueSnackbar(error?.response?.data?.message || error.message, {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    setUserData({
      ...userData,
      role: selected?.value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handlSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username*
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={userData.username}
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email*
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={userData.email}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="relative inline-block w-full">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type*
                </label>
                <SelectInput
                  list={userRoleList}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
              <CustomPasswordInput
                label="Password*"
                name="password"
                id="password"
                value={userData.password}
                onchange={handleChangeInput}
              />
              <CustomPasswordInput
                label="Confirm password*"
                name="confirm_password"
                id="confirm_password"
                value={userData.confirm_password}
                onchange={handleChangeInput}
              />
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                    value={isChecked}
                    onChange={() => {
                      setIsChecked(!isChecked);
                    }}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Terms and Conditions
                    </span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={
                  !isChecked ||
                  userData.email === "" ||
                  userData?.password === "" ||
                  userData?.confirm_password === ""
                }
                className="w-full text-white bg-primary-600 disabled:bg-primary-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
