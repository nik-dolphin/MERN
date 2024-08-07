import React, { useCallback, useContext, useEffect, useState } from "react";
import Card from "./card";
import axiosInstance from "../services/axios-client";
import {
  ADD_TO_CART,
  INITIAL_CURRENT_PAGE,
  PRODUCT_LIST,
  SHOW_ITEMS_PER_PAGE,
} from "../constants";
import { enqueueSnackbar } from "notistack";
import { AuthenticateContext } from "../App";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { reduce } from "lodash";
import { addToCart } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../redux/actions/productAction";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import SelectInput from "./select-input";
import { productShortList } from "../utility/utils";
import { useNavigate } from "react-router-dom";

const DashboardProducts = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const productData = useSelector((state) => state);
  const [data, setData] = useState([]);
  const { contextData } = useContext(AuthenticateContext);
  const [isFavorite, setIsFavorite] = useState({});
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [favoriteList, setFavoriteList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState(productShortList[0]);

  const getAllProduct = async ({ offset }) => {
    dispatch(productList(PRODUCT_LIST, offset));
    await axiosInstance
      .get(`/getAllProducts?limit=${SHOW_ITEMS_PER_PAGE}&offset=${offset}`)
      .then((res) => {
        if (res) {
          const response = res?.data?.data?.map((item, index) => {
            return {
              ...item,
              index: index + 1,
            };
          });
          setData(response);
          setFilteredData(response);
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
    const list = data?.map((i) => {
      const isFavoriteData = favoriteList.filter(
        (item) => item?.productId === i?.id
      );
      return {
        ...i,
        isFavorite: isFavoriteData[0]?.isFavorite ? true : false,
      };
    });
    setData(list);
    setFilteredData(list);
  }, [favoriteList]);

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

  useEffect(() => {
    if (contextData?.config) {
      getFavoriteList();
      getAllProduct({ offset: INITIAL_CURRENT_PAGE });
    }
  }, [contextData]);

  const handleClickAddToCart = (data) => {
    dispatch(addToCart(ADD_TO_CART, data));
  };

  const handleSubmitSearchProduct = (e) => {
    e.preventDefault();
    const searchFilteredList = [...filteredData].filter((item) =>
      item?.product_title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(searchFilteredList);
  };

  const handleClickClearFilter = () => {
    setSearch("");
    setFilteredData(data);
    setSelected(productShortList[0]);
  };

  useEffect(() => {
    if (selected.value !== "") {
      const sortedList = [...filteredData].sort((a, b) => {
        return selected.value === "asc"
          ? a.purchase_price - b.purchase_price
          : b.purchase_price - a.purchase_price;
      });
      setFilteredData(sortedList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <>
      <section className="flex justify-center">
        <div className="w-full max-w-[1640px] mx-auto p-4 flex justify-start gap-4 flex-col md:flex-row items-center">
          <form
            className="max-w-md w-full md:w-2/5"
            onSubmit={handleSubmitSearchProduct}
          >
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full px-4 py-3 text-sm ocus:outline-none  text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
              {search !== "" && (
                <div className="absolute end-10 top-0 bottom-0 focus:outline-none font-medium rounded-lg px-4 py-2 flex justify-center items-center">
                  <IoMdClose
                    onClick={() => setSearch("")}
                    size={30}
                    className="cursor-pointer"
                  />
                </div>
              )}
              <button
                type="submit"
                className="absolute end-0 top-0 bg-green-1 hover:bg-green-2 focus:outline-none font-medium rounded-tr-lg rounded-br-lg flex justify-center items-center h-full w-12"
              >
                <FaSearch size={20} />
              </button>
            </div>
          </form>
          <div className="w-full md:w-auto">
            <SelectInput
              list={productShortList}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <div
            className="flex items-end underline font-bold cursor-pointer justify-center h-full"
            onClick={handleClickClearFilter}
          >
            Clear Filter
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="w-full max-w-[1640px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-2 p-4">
          {filteredData.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {filteredData?.map((item, index) => (
                <div key={index} className="w-full h-full max-h-96">
                  <Card
                    data={item}
                    isFavorite={isFavorite}
                    setIsFavorite={setIsFavorite}
                    handleClickFavorite={handleClickFavorite}
                    bottomBtn={() => (
                      <>
                        <button
                          onClick={() => {
                            handleClickAddToCart(item);
                            navigate("/cart-list");
                          }}
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
            <>
              <ShimmerSimpleGallery card imageHeight={300} caption col={2} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default DashboardProducts;
