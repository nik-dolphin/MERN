import { enqueueSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN, USER } from "../constants";
import axiosInstance from "../services/axios-client";
import CustomPasswordInput from "../component/custom-password-input";
import { AuthenticateContext } from "../App";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { setContextData } = useContext(AuthenticateContext);
  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const loginUser = async (data) => {
    console.log("__Data", data);
    await axiosInstance
      .post(`/login`, userData)
      .then((res) => {
        if (res?.statusText === "OK") {
          localStorage.setItem(AUTH_TOKEN, JSON.stringify(res.data.token));
          localStorage.setItem(USER, JSON.stringify(res.data.user));
          setContextData({
            token: res.data.token,
            user: res.data.user,
            config: {
              headers: { Authorization: `Bearer ${res.data.token}` },
            },
          });
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          navigate("/");
        }
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error?.message, {
          variant: "error",
        });
      });
  };

  const handlSubmit = async (e) => {
    e.preventDefault();
    await loginUser();
  };

  const googleResponseMessage = (response) => {
    console.log("__response", response);
  };

  const googleErrorMessage = (error) => {
    enqueueSnackbar(error?.response?.data?.message || error?.message, {
      variant: "error",
    });
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handlSubmit}>
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
              <CustomPasswordInput
                label="Password*"
                name="password"
                id="password"
                value={userData.password}
                onchange={handleChangeInput}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
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
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="text-sm font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="text-center flex flex-col gap-y-2 items-center">
                <button
                  type="submit"
                  disabled={userData.email === "" || userData?.password === ""}
                  className="w-full text-white bg-green-1 disabled:bg-green-3 hover:bg-green-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <div className="w-full text-cente">OR</div>
                <GoogleLogin
                  onSuccess={googleResponseMessage}
                  onError={googleErrorMessage}
                />
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-black hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
