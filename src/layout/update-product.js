import React, { useCallback, useContext, useEffect, useState } from "react";
import SelectInput from "../component/select-input";
import { productCategoryList } from "../utility/utils";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../services/axios-client";
import { enqueueSnackbar } from "notistack";
import { FaArrowLeft } from "react-icons/fa";
import { AuthenticateContext } from "../App";
import { isEqual } from "lodash";

const UpdateProduct = () => {
  let { productId } = useParams();
  const navigate = useNavigate();
  const { contextData } = useContext(AuthenticateContext);
  const [image, setImage] = useState({ preview: "", data: "" });
  const [selectedCategory, setSelectedCategory] = useState({});
  const [productData, setProductData] = useState({
    product_sku: "",
    product_title: "",
    product_Brand: "",
    purchase_price: "",
    retail_price: "",
    category: "",
    quanitity: "",
    description: "",
    imageFile: "",
  });
  const [actualProductData, setActualProductData] = useState({});

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleChangeImage = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setProductData({
      ...productData,
      imageFile: e.target.files[0],
    });
    setImage(img);
  };

  useEffect(() => {
    setProductData({
      ...productData,
      category: selectedCategory?.value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const handlSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_sku", productData.product_sku);
    formData.append("product_title", productData.product_title);
    formData.append("product_Brand", productData.product_Brand);
    formData.append("purchase_price", productData.purchase_price);
    formData.append("retail_price", productData.retail_price);
    formData.append("category", productData.category);
    formData.append("quanitity", productData.quanitity);
    formData.append("description", productData.description);
    if (image.preview !== actualProductData?.imageUrl) {
      formData.append("imagePreview", actualProductData?.imageUrl);
      formData.append("imageFile", image.data);
    }
    const headers = {
      "Content-Type": "multipart/form-data",
      ...contextData?.config?.headers,
    };
    await axiosInstance
      .post(`/updateProduct/${contextData?.user?.id}/${productId}`, formData, {
        headers,
      })
      .then((res) => {
        if (res?.statusText === "OK") {
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          navigate("/product-list");
        }
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error.message, {
          variant: "error",
        });
      });
  };

  const getProduct = useCallback(async () => {
    await axiosInstance
      .get(`/getProduct/${productId}`)
      .then((res) => {
        console.log("__Res", res);
        if (res?.statusText === "OK") {
          setProductData(res?.data?.data);
          setActualProductData(res?.data?.data);
          setImage({
            preview: res?.data?.data?.imageUrl,
          });
          const category = productCategoryList.find(
            (item) => item?.value === res?.data?.data?.category
          );
          setSelectedCategory(category);
        }
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error.message, {
          variant: "error",
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-top justify-start px-6 py-8 mx-auto w-full max-w-[1640px]">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              <div
                className="w-max flex items-center gap-3 hover:text-green-1 cursor-pointer transition-text duration-300"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft />
                Update Product
              </div>
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handlSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/4">
                  <label
                    htmlFor="product_sku"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product SKU*
                  </label>
                  <input
                    type="text"
                    name="product_sku"
                    id="product_sku"
                    placeholder="Product SKU"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={productData?.product_sku}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="w-full md:w-2/4">
                  <label
                    htmlFor="product_title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Title*
                  </label>
                  <input
                    type="text"
                    name="product_title"
                    id="product_title"
                    placeholder="Product Title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={productData?.product_title}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="w-full md:w-2/4">
                  <label
                    htmlFor="product_Brand"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Brand*
                  </label>
                  <input
                    type="text"
                    name="product_Brand"
                    id="product_Brand"
                    placeholder="Product Brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={productData?.product_Brand}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/4">
                  <label
                    htmlFor="purchase_price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Purchase Price
                  </label>
                  <input
                    type="text"
                    name="purchase_price"
                    id="purchase_price"
                    placeholder="Purchase Price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={productData?.purchase_price}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="w-full md:w-2/4">
                  <label
                    htmlFor="retail_price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Retail Price*
                  </label>
                  <input
                    type="text"
                    name="retail_price"
                    id="retail_price"
                    placeholder="Retail Price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={productData?.retail_price}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-2/4">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <SelectInput
                    list={productCategoryList}
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                    placeholder={"Select Category"}
                  />
                </div>
                <div className="w-full md:w-2/4">
                  <label
                    htmlFor="quanitity"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantity*
                  </label>
                  <input
                    type="text"
                    name="quanitity"
                    id="quanitity"
                    placeholder="Quantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={productData?.quanitity}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description*
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="min-h-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={productData?.description}
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <label
                  htmlFor="upload_product_image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Product Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-image"
                    className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="absolute w-full h-full flex flex-col items-center justify-center pt-5 pb-6">
                      {image?.preview ? (
                        <>
                          <img
                            src={image?.preview}
                            alt="preview product"
                            className="w-40 h-40"
                            onError={(e) => {
                              e.target.src = "/product-placeholder.png";
                            }}
                          />
                          <p className="p-2 break-all text-center">
                            {image?.data?.name}
                          </p>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 px-4 text-center flex flex-col sm:flex-row gap-1">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or
                            <span> drag and drop</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 px-4 text-center">
                            SVG, PNG, JPG, JPEG or GIF (MAX. 800x400px)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="dropzone-image"
                      type="file"
                      name="image"
                      className="hidden"
                      accept="image/svg,image/png,image/gif,image/jpg,image/jpeg"
                      onChange={handleChangeImage}
                    />
                  </label>
                </div>
              </div>
              <div className="relative inline-block w-full"></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="submit"
                  className="text-black bg-green-1 disabled:bg-green-200 hover:bg-green-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-1 dark:hover:bg-green-20 transition-bg duration-300"
                  disabled={isEqual(actualProductData, productData)}
                >
                  Update Product
                </button>
                <button
                  type="cancel"
                  onClick={handleCancelClick}
                  className="border border-black hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;
