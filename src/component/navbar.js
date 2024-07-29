/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { FaRegUser, FaWallet } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import { enqueueSnackbar } from "notistack";
import axiosInstance from "../services/axios-client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Modal from "./modal";
import ChangePasswordForm from "./forms/change-password-form";
import { AuthenticateContext } from "../App";

const Navbar = () => {
  const { contextData } = useContext(AuthenticateContext);
  let navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const defaultPasswordObj = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };
  const [data, setData] = useState(defaultPasswordObj);

  const menuItemsUser = [
    {
      icon: <TbTruckDelivery size={25} className="mr-4" />,
      text: "Orders",
      routeUrl: "/",
    },
    {
      icon: <MdFavorite size={25} className="mr-4" />,
      text: "Favorites",
      routeUrl: "/favorite-list",
    },
    {
      icon: <FaWallet size={25} className="mr-4" />,
      text: "Wallet",
      routeUrl: "/",
    },
    {
      icon: <MdHelp size={25} className="mr-4" />,
      text: "Help",
      routeUrl: "/",
    },
  ];
  const menuItemsAdmin = [
    {
      icon: <TbTruckDelivery size={25} className="mr-4" />,
      text: "Product List",
      routeUrl: "/product-list",
    },
    {
      icon: <FaWallet size={25} className="mr-4" />,
      text: "Users",
      routeUrl: "/users",
    },
  ];

  const handleClickLogout = async () => {
    await axiosInstance
      .get(`/logout`, contextData?.config)
      .then((res) => {
        if (res?.statusText === "OK") {
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          localStorage.removeItem(AUTH_TOKEN);
          navigate("/login");
        }
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error.message, {
          variant: "error",
        });
      });
  };

  const handleClosemodal = () => {
    setIsChangePasswordModalOpen(false);
    setData(defaultPasswordObj);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post(`/change-password`, data, contextData?.config)
      .then((res) => {
        if (res?.statusText === "OK") {
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          handleClosemodal();
        }
      })
      .catch((error) => {
        enqueueSnackbar(
          error?.response?.data?.message ||
            error.message ||
            "Something went wrong",
          {
            variant: "error",
          }
        );
      });
  };

  return (
    <>
      <div className="flex justify-center shadow-sm border-b-2">
        <div className="w-full max-w-[1640px] mx-auto flex justify-between items-end md:items-center gap-y-2 p-4">
          <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
            <div
              onClick={() => setNav(!nav)}
              className="cursor-pointer block lg:hidden"
            >
              <AiOutlineMenu size={30} />
            </div>
            <Link to={"/"}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
                Best <span className="font-bold text-green-1">Eats</span>
              </h1>
            </Link>
          </div>
          {contextData?.user && contextData?.user?.role === "0" && (
            <nav className="hidden lg:block">
              <ul className="flex text-gray-800 gap-2">
                {menuItemsUser.map(({ icon, text, routeUrl }, index) => {
                  return (
                    <div key={index}>
                      <li className="text-xl flex cursor-pointer rounded-full mx-auto p-2 hover:text-white hover:bg-black">
                        <Link to={routeUrl}>{text}</Link>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </nav>
          )}
          {contextData?.user && contextData?.user?.role === "1" && (
            <nav className="hidden lg:block">
              <ul className="flex text-gray-800 gap-2">
                {menuItemsAdmin.map(({ icon, text, routeUrl }, index) => {
                  return (
                    <div key={index}>
                      <li className="text-xl flex cursor-pointer rounded-full mx-auto p-2 hover:text-white hover:bg-black">
                        <Link to={routeUrl}>{text}</Link>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </nav>
          )}
          <div className="flex gap-2">
            {contextData?.user && contextData?.user?.role === "0" && (
              <>
                <div className="bg-gray-200 rounded-full hidden md:flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
                  <AiOutlineSearch size={25} />
                  <input
                    className="bg-transparent p-2 w-full focus:outline-none"
                    type="text"
                    placeholder="Search foods"
                  />
                </div>
                <button className="bg-black text-white hidden md:flex items-center py-2 rounded-full border border-black px-3">
                  <BsFillCartFill size={20} />
                </button>
              </>
            )}
            <div
              id="user-dropdown"
              className="relative inline-block text-left dropdown w-11"
            >
              <Popover className="relative">
                <PopoverButton className="bg-green-1 text-black flex justify-center items-center rounded-full h-11 w-full text-sm font-medium leading-5 transition-bg duration-150 ease-in-out hover:bg-green-2 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-500 active:text-gray-800">
                  <FaRegUser size={20} className="" />
                </PopoverButton>
                <PopoverPanel
                  anchor="bottom"
                  className="flex flex-col bg-slate-100 right-0 w-60 rounded-md shadow-sm shadow-slate-600"
                >
                  <div
                    className="hover:bg-slate-400 px-5 py-3 cursor-pointer"
                    onClick={() => setIsChangePasswordModalOpen(true)}
                  >
                    Change Password
                  </div>
                  <div
                    className="hover:bg-slate-400 px-5 py-3 border border-t-2 cursor-pointer"
                    onClick={() => setIsLogoutModalOpen(true)}
                  >
                    Logout
                  </div>
                </PopoverPanel>
              </Popover>
            </div>
          </div>
          {nav ? (
            <div className="block lg:hidden bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
          ) : (
            ""
          )}
          <div
            className={`block lg:hidden
      ${
        nav
          ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
          : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
      }
    `}
          >
            <AiOutlineClose
              onClick={() => setNav(!nav)}
              size={30}
              className="absolute right-4 top-4 cursor-pointer"
            />
            <h2 className="text-2xl p-4">
              Best <span className="font-bold text-green-1">Eats</span>
            </h2>
            <nav>
              <ul className="flex flex-col p-4 text-gray-800">
                {contextData?.user && contextData?.user?.role === "0"
                  ? menuItemsUser.map(({ icon, text }, index) => {
                      return (
                        <div key={index} className=" py-4">
                          <li className="text-xl flex cursor-pointer  w-[50%] rounded-full mx-auto p-2 hover:text-white hover:bg-black">
                            {icon} {text}
                          </li>
                        </div>
                      );
                    })
                  : menuItemsAdmin.map(({ icon, text, routeUrl }, index) => {
                      return (
                        <div key={index} className=" py-4">
                          <li className="text-xl flex cursor-pointer  w-[50%] rounded-full mx-auto p-2 hover:text-white hover:bg-black">
                            <Link to={routeUrl}>{text}</Link>
                          </li>
                        </div>
                      );
                    })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Modal
        showModal={isLogoutModalOpen}
        closeModal={() => setIsLogoutModalOpen(false)}
        content={() => ({
          body: () => (
            <p>You are about to log out. Make sure you have saved your work.</p>
          ),
          footer: () => (
            <>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border text-white bg-primary-600 disabled:bg-primary-400 hover:bg-primary-700 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={handleClickLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-red-600 bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </button>
            </>
          ),
        })}
      />
      <Modal
        label="Change Password"
        showModal={isChangePasswordModalOpen}
        closeModal={handleClosemodal}
        content={() => ({
          body: () => <ChangePasswordForm data={data} setData={setData} />,
          footer: () => (
            <>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border text-white bg-primary-600 disabled:bg-primary-400 hover:bg-primary-700 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={handleChangePassword}
                disabled={
                  data?.current_password === "" ||
                  data?.new_password === "" ||
                  data?.confirm_password === ""
                }
              >
                Update
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-red-600 bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={handleClosemodal}
              >
                Cancel
              </button>
            </>
          ),
        })}
      />
    </>
  );
};

export default Navbar;
