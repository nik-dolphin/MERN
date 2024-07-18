import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../services/axios-client";
import CustomPasswordInput from "../component/custom-password-input";

const ResetPassword = () => {
  console.log("__entered");
  let navigate = useNavigate();
  let { userId, token } = useParams();
  const [userData, setUserData] = useState({
    password: "",
    confirm_password: "",
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
      .post(`/reset-password/${userId}/${token}`, userData)
      .then((res) => {
        if (res?.statusText === "OK") {
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error.message, {
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
              Reset your password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handlSubmit}>
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
              <button
                type="submit"
                disabled={
                  userData.password === "" || userData.confirm_password === ""
                }
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

export default ResetPassword;
