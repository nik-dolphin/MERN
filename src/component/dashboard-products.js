import React, { useEffect, useRef, useState } from "react";
import Card from "./card";
import axiosInstance from "../services/axios-client";
import { INITIAL_CURRENT_PAGE, SHOW_ITEMS_PER_PAGE } from "../constants";
import { enqueueSnackbar } from "notistack";

const DashboardProducts = () => {
  const ref = useRef(true);
  const [data, setData] = useState([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  console.log("__data", data);
  const getAllProduct = async ({ offset }) => {
    await axiosInstance
      .get(`/getAllProducts?limit=${SHOW_ITEMS_PER_PAGE}&offset=${offset}`)
      .then((res) => {
        if (res) {
          const response = res?.data?.data?.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
          setData(response);
          setTotalProductsCount(res?.data?.totalCount);
        }
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error.message, {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    if (ref.current) {
      getAllProduct({ offset: INITIAL_CURRENT_PAGE });
      ref.current = false;
    }
  }, []);

  return (
    <>
      <section className="flex justify-center">
        <div className="w-full max-w-[1640px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-2 p-4">
          <div className="grid grid-cols-4 gap-4">
            {data?.map((item, index) => (
              <div key={index} className="w-full h-full">
                <Card data={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardProducts;
