import React, { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import axiosInstance from "../services/axios-client";
import { enqueueSnackbar } from "notistack";
import { AuthenticateContext } from "../App";
import { reduce } from "lodash";
import Card from "./card";
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART } from "../constants";
import { addToCart, emptyCart, removeToCart } from "../redux/action";

const CartList = () => {
  const dispatch = useDispatch();
  const { contextData } = useContext(AuthenticateContext);
  const cartData = useSelector((state) => state.cartData);
  const [isFavorite, setIsFavorite] = useState({});
  const [favoriteList, setFavoriteList] = useState([]);

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
          setFavoriteList(res?.data?.data);
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

  const handleClickFavorite = async (data) => {
    setIsFavorite((prevState) => {
      const newIsFavorite = {
        ...prevState,
        [data?.id]: !isFavorite[data?.id] || true,
      };
      return newIsFavorite;
    });
    updateFavoriteList(data);
  };

  const handleClickRemoveToCart = (data) => {
    dispatch(removeToCart(REMOVE_FROM_CART, data));
  };

  const handleClickEmptyCart = () => {
    dispatch(emptyCart(EMPTY_CART));
  };

  return (
    <section className="p-5 h-5/6">
      <div className="w-full text-right">
        <button
          onClick={handleClickEmptyCart}
          className=" bg-green-1 hover:bg-green-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Empty cart
        </button>
      </div>
      {cartData.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {cartData?.map((item, index) => (
            <div key={index} className="w-full h-full max-h-96">
              <Card
                data={item}
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
                handleClickFavorite={handleClickFavorite}
                bottomBtn={() => (
                  <>
                    <button
                      onClick={() => handleClickRemoveToCart(item)}
                      className=" bg-green-1 hover:bg-green-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Remove to cart
                    </button>
                  </>
                )}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-3/4">
          No Data found
        </div>
      )}
    </section>
  );
};

export default CartList;
