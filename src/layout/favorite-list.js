import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axiosInstance from "../services/axios-client";
import { AuthenticateContext } from "../App";
import { enqueueSnackbar } from "notistack";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import Card from "../component/card";
import { reduce } from "lodash";
import { ADD_TO_CART } from "../constants";
import { addToCart } from "../redux/action";
import { useDispatch } from "react-redux";
// import NotFound from "/public/images/data_not_found.webm";

const FavoriteList = () => {
  const ref = useRef(true);
  const dispatch = useDispatch();
  const { contextData } = useContext(AuthenticateContext);
  const [isFavorite, setIsFavorite] = useState({});
  const [favoriteProductList, setFavoriteProductList] = useState([]);
  console.log("__isFavorite", isFavorite);

  const GetFavoriteProductList = useCallback(async () => {
    if (contextData.token !== "") {
      await axiosInstance
        .get(
          `/getFavoriteProductList/${contextData?.user?.id}`,
          contextData?.config
        )
        .then((res) => {
          console.log("__res.data.data", res.data.data);

          const result = reduce(
            res.data.data,
            (acc, item) => {
              acc[item.productData?.id] = item.isFavorite;
              return acc;
            },
            {}
          );
          setIsFavorite(result);
          setFavoriteProductList(res?.data?.data);
        })
        .catch((error) => {
          enqueueSnackbar(error?.response?.data?.message || error.message, {
            variant: "error",
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData.token]);

  useEffect(() => {
    if (ref.current && contextData.token !== "") {
      GetFavoriteProductList();
      ref.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData]);

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
            GetFavoriteProductList();
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
  const handleClickAddToCart = (data) => {
    dispatch(addToCart(ADD_TO_CART, data));
  };

  return (
    <>
      <section className="flex justify-center">
        <div className="w-full max-w-[1640px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-2 p-4">
          {favoriteProductList.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {favoriteProductList?.map((item, index) => (
                <div key={index} className="w-full h-full max-h-96">
                  <Card
                    data={{ ...item, ...item?.productData }}
                    isFavorite={isFavorite}
                    setIsFavorite={setIsFavorite}
                    handleClickFavorite={handleClickFavorite}
                    bottomBtn={() => (
                      <>
                        <button
                          onClick={() => handleClickAddToCart(item)}
                          className=" bg-green-1 hover:bg-green-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Add to cart
                        </button>
                      </>
                    )}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
            {/* <Lottie animationData={groovyWalkAnimation} loop={true} /> */}
              {/* <img
                className="rounded-t-lg w-full h-full"
                src="/images/not-found.gif"
                alt="not found"
              /> */}
              {/* <ShimmerSimpleGallery card imageHeight={300} caption col={2} /> */}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FavoriteList;
