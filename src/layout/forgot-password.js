import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axios-client";

const ForgotPassword = () => {
  const [userData, setUserData] = useState({
    email: "",
  });

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
      .post(`/forgot-password`, userData)
      .then((res) => {
        if (res?.statusText === "OK") {
          localStorage.setItem("authToken", JSON.stringify(res.data.token));
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error?.message, {
          variant: "error",
        });
      });
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot password?
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handlSubmit}>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={userData.email}
                  onChange={handleChangeInput}
                />
              </div>
              <button
                type="submit"
                disabled={userData.email === ""}
                className="w-full text-white bg-green-1 disabled:bg-green-3 hover:bg-green-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Reset Password
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Remember your password?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-black hover:underline"
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

export default ForgotPassword;
