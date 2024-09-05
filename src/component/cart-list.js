import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../services/axios-client";
import { enqueueSnackbar } from "notistack";
import { AuthenticateContext } from "../App";
import { reduce } from "lodash";
import { ADD_ALL_CART, EMPTY_CART, REMOVE_FROM_CART } from "../constants";
import { addToCart, emptyCart, removeToCart } from "../redux/action";
import { useNavigate } from "react-router-dom";
import { LiaRupeeSignSolid } from "react-icons/lia";

const CartList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { contextData } = useContext(AuthenticateContext);
  const { cartData } = useSelector((state) => state);
  const [cartDetails, setCartDetails] = useState();
  console.log("__cartData", cartData);

  const [isFavorite, setIsFavorite] = useState({});

  const getFavoriteList = useCallback(async () => {
    if (contextData.token !== "") {
      await axiosInstance
        .get(`/getFavoriteList/${contextData?.user?.id}`, contextData?.config)
        .then((res) => {
          const result = reduce(
            res.data.data,
            (acc, item) => {
              acc[item.productId] = item.isFavorite;
              return acc;
            },
            {}
          );
          setIsFavorite(result);
        })
        .catch((error) => {
          enqueueSnackbar(error?.response?.data?.message || error.message, {
            variant: "error",
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData.token]);

  const updateFavoriteList = useCallback(
    (data) => {
      if (contextData?.token !== "") {
        axiosInstance
          .post(
            `/isFavorite/${contextData?.user?.id}/${data?.id}`,
            {
              isFavorite: !isFavorite[data?.id],
            },
            contextData?.config
          )
          .then((res) => {
            getFavoriteList();
          })
          .catch((error) => {
            enqueueSnackbar(error?.response?.data?.message || error.message, {
              variant: "error",
            });
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contextData, isFavorite]
  );

  const handleClickRemoveToCart = async (data) => {
    await axiosInstance
      .delete(
        `/removeFromCartData/${contextData?.user?.id}/${data?.id}`,
        contextData?.config
      )
      .then((res) => {
        console.log("__Res", res);
        dispatch(removeToCart(REMOVE_FROM_CART, data));
        if (cartData?.length === 1) {
          navigate("/");
        }
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error.message, {
          variant: "error",
        });
      });
  };

  const handleClickEmptyCart = async () => {
    console.log("__cartDetails asdsad", cartDetails);

    await axiosInstance
      .delete(
        `/emptyCart/${cartDetails?.data?.data[0]?._id}`,
        contextData?.config
      )
      .then((res) => {
        console.log("__empty Data", res);
        enqueueSnackbar(res?.data?.message, {
          variant: "success",
        });
        dispatch(emptyCart(EMPTY_CART));
        navigate("/");
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error.message, {
          variant: "error",
        });
      });
  };

  const getCartList = useCallback(async () => {
    if (contextData.token !== "") {
      await axiosInstance
        .get(`/getCartData/${contextData?.user?.id}`, contextData?.config)
        .then((res) => {
          const data = res?.data?.data[0]?.cartProductList;
          console.log("__getAllData", res?.data?.data);
          setCartDetails(res);
          dispatch(addToCart(ADD_ALL_CART, data));
        })
        .catch((error) => {
          enqueueSnackbar(error?.response?.data?.message || error.message, {
            variant: "error",
          });
        });
    }
  }, []);

  useEffect(() => {
    console.log("__called", contextData);

    if (contextData?.config) {
      getCartList();
    }
  }, [contextData]);

  return (
    <section className="p-5 h-full bg-gray-100">
      <div className="w-full text-right">
        <button
          onClick={handleClickEmptyCart}
          className=" bg-green-1 uppercase hover:bg-green-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Empty cart
        </button>
      </div>
      <div className="flex flex-col justify-center items-center py-4">
        <div className="w-full flex flex-col md:flex-row justify-center items-start gap-4 max-w-6xl py-4">
          <div className="w-full md:w-3/5 bg-white box-shadow-custom rounded p-4">
            {cartData?.map((item, index) => (
              <div key={index}>
                <div className="w-full h-full max-h-96 flex justify-start gap-4">
                  <div className="flex justify-center items-center h-2/6 md:h-28 w-2/6 md:w-28">
                    <img
                      className="rounded-t-lg w-full h-full"
                      src={item?.imageUrl}
                      alt="product"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-2/3">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                        {item?.product_title}
                      </h3>
                      <h5 className="tracking-tight text-gray-900 dark:text-white line-clamp-2">
                        {item?.description}
                      </h5>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl lg:text-3xl text-gray-900 dark:text-white flex items-center">
                        <LiaRupeeSignSolid />
                        {item?.purchase_price}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleClickRemoveToCart(item)}
                  className="focus:outline-none font-medium rounded-lg text-sm my-2.5 text-center hover:text-green-1"
                >
                  REMOVE
                </button>
              </div>
            ))}
          </div>
          <div className="w-full md:w-5/12 bg-white box-shadow-custom rounded">
            <h3 className="text-xl font-medium tracking-tight text-gray-400 uppercase dark:text-white line-clamp-1 px-4 py-3">
              Price details
            </h3>
            <hr />
            <div className="mx-4 border-b-2 border-dashed border-gray-400">
              <div className="flex justify-between items-center py-2">
                <div>{`Price (${cartData.length} ${
                  cartData.length === 1 ? "item" : "items"
                })`}</div>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>Discount</div>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>Delivery Charges</div>
              </div>
            </div>
            <div className="px-4">
              <div className="flex justify-between items-center py-2">
                <div>{`Price (${cartData.length} ${
                  cartData.length === 1 ? "item" : "items"
                })`}</div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className=" bg-green-1 hover:bg-green-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Checkout
        </button>
      </div>
      {cartData.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4"></div>
      ) : (
        <div className="flex justify-center items-center h-3/4">
          No Data found
        </div>
      )}
    </section>
  );
};

export default CartList;
