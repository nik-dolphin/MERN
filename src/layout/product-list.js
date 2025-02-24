import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import axiosInstance from "../services/axios-client";
import { enqueueSnackbar } from "notistack";
import { AgGridReact } from "ag-grid-react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { productCategoryList } from "../utility/utils";
import { useNavigate } from "react-router-dom";
import Modal from "../component/modal";
import { AuthenticateContext } from "../App";
import Pagination from "../component/pagination";
import { INITIAL_CURRENT_PAGE, SHOW_ITEMS_PER_PAGE } from "../constants";

const TablePlaceHolderHelper = () => {
  return (
    <h1>
      <b>No Data Found</b>
    </h1>
  );
};
const ProductList = () => {
  const navigate = useNavigate();
  const { contextData } = useContext(AuthenticateContext);
  const ref = useRef(true);
  const [data, setData] = useState([]);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [isEditMOdalOpen, setIsEditMOdalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);
  const [showProductsPerPage, setShowProductsPerPage] = useState([]);
  console.log("__selectedRowData", showProductsPerPage);

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

  const defaultColDefs = useMemo(() => {
    return {
      cellStyle: {
        whiteSpace: "nowrap",
        fontSize: "16px",
        border: ".1px solid white",
      },
      sortable: false,
      flex: 1,
      minWidth: 200,
    };
  }, []);

  const columnsAgGrid = useMemo(
    () => [
      {
        field: "index",
        headerName: "Index",
        cellStyle: { textAlign: "center" },
        lockPosition: "left",
        cellClass: "locked-col",
      },
      {
        field: "product_image",
        headerName: "Product Image",
        cellStyle: { textAlign: "center" },
        cellRenderer: (props) => {
          console.log("__props", props.data);
          return (
            <div className="flex flex-row justify-center items-center h-full gap-3">
              {props?.data?.imageUrl ? (
                <img
                  src={props?.data?.imageUrl}
                  alt={props?.data?.originalname}
                  width={70}
                  height={70}
                  onError={(e) => {
                    e.target.src = "/product-placeholder.png";
                  }}
                />
              ) : (
                <img
                  src={"/product-placeholder.png"}
                  alt="placeholder"
                  width={50}
                  height={50}
                />
              )}
            </div>
          );
        },
      },
      {
        field: "product_sku",
        headerName: "Product SKU",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "product_title",
        headerName: "Product Title",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "product_Brand",
        headerName: "Product Brand",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "purchase_price",
        headerName: "Purchase Price",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "retail_price",
        headerName: "Retail Price",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "category",
        headerName: "Category",
        cellStyle: { textAlign: "center" },
        cellRenderer: (props) =>
          productCategoryList?.filter(
            (item) => item?.value === props?.data?.category
          )[0]?.label,
      },
      {
        field: "quanitity",
        headerName: "Quanitity",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "description",
        headerName: "Description",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 100,
        width: 100,
        resizable: false,
        cellStyle: { borderLeft: "1px solid #E4E4E4" },
        pinned: "right",
        lockPosition: "right",
        cellClass: "locked-col",
        cellRenderer: (props) => (
          <div className="flex flex-row justify-center items-center h-full gap-3">
            <button
              className="cursor-pointer"
              onClick={() => {
                setSelectedRowData(props.data);
                setIsEditMOdalOpen(!isEditMOdalOpen);
                navigate(`/update-product/${props.data?.id}`);
              }}
            >
              <CiEdit size={25} />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => {
                setSelectedRowData(props.data);
                setIsDeleteModelOpen(!isDeleteModelOpen);
              }}
            >
              <CiTrash size={25} />
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClickDeleteProduct = async () => {
    await axiosInstance
      .delete(
        `/deleteProduct/${contextData?.user?.id}/${selectedRowData?.id}`,
        contextData?.config
      )
      .then((res) => {
        if (res?.statusText === "OK") {
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          setIsDeleteModelOpen(false);
          getAllProduct({ offset: INITIAL_CURRENT_PAGE });
          setSelectedRowData({});
        }
      })
      .catch((error) => {
        enqueueSnackbar(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong",
          {
            variant: "error",
          }
        );
      });
  };

  // const handleClickUpdateProduct = async (e) => {
  //   e.preventDefault();
  //   await axiosInstance
  //     .post(
  //       `/updateProduct/${contextData?.user?.id}`,
  //       selectedRowData,
  //       contextData?.config
  //     )
  //     .then((res) => {
  //       if (res?.statusText === "OK") {
  //         enqueueSnackbar(res?.data?.message, {
  //           variant: "success",
  //         });
  //         getAllProduct({ offset: INITIAL_CURRENT_PAGE });
  //         setIsEditMOdalOpen(false);
  //         setSelectedRowData({});
  //       }
  //     })
  //     .catch((error) => {
  //       enqueueSnackbar(error?.response?.data?.message || error.message, {
  //         variant: "error",
  //       });
  //     });
  // };

  return (
    <div className="flex justify-center items-start w-full">
      <div className="product-list flex-col flex justify-start items-top h-full my-3 w-full max-w-[1640px]">
        <div className="flex justify-end p-4 w-full max-w-[1640px]">
          <button
            className="bg-green-1 hover:bg-green-2 p-3 rounded-lg transition-text duration-300"
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </button>
        </div>
        <div className="top-0 ag-theme-quartz h-full p-4 w-full max-w-[1640px]">
          <div className="relative">
            <AgGridReact
              rowData={data}
              columnDefs={columnsAgGrid}
              defaultColDef={defaultColDefs}
              rowSelection="multiple"
              domLayout={"autoHeight"}
              reactiveCustomComponents
              suppressModelUpdateAfterUpdateTransaction={true}
              suppressDragLeaveHidesColumns={true}
              noRowsOverlayComponent={TablePlaceHolderHelper}
            />
          </div>
        </div>
        <Pagination
          dataList={data}
          totalItems={totalProductsCount}
          itemsPerPage={SHOW_ITEMS_PER_PAGE}
          currentPage={currentPage}
          GetProductsList={getAllProduct}
          setCurrentPage={setCurrentPage}
          setShowProductsPerPage={setShowProductsPerPage}
        />
      </div>
      <Modal
        label={
          <>
            Delete <b>{selectedRowData?.product_title || ""}</b>
          </>
        }
        showModal={isDeleteModelOpen}
        closeModal={() => setIsDeleteModelOpen(false)}
        content={() => ({
          body: () => (
            <>
              Are you sure you want to delete{" "}
              <b>{selectedRowData?.product_title || ""}</b> product?
            </>
          ),
          footer: () => (
            <>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border text-white bg-primary-600 disabled:bg-primary-400 hover:bg-primary-700 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={handleClickDeleteProduct}
              >
                Delete
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-red-600 bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsDeleteModelOpen(false)}
              >
                Cancel
              </button>
            </>
          ),
        })}
      />
    </div>
  );
};

export default ProductList;
