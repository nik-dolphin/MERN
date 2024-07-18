import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";
import axiosInstance from "../services/axios-client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { CiEdit, CiTrash } from "react-icons/ci";
import { BsArrowDownShort } from "react-icons/bs";
import Modal from "../component/modal";
import { isEqual } from "lodash";
import UpdateUserModalForm from "../component/forms/update-user-modal-form";
import { AuthenticateContext } from "../App";

const TablePlaceHolderHelper = () => {
  return (
    <h1>
      <b>No Data Found</b>
    </h1>
  );
};

const Users = () => {
  const ref = useRef(true);
  const { contextData } = useContext(AuthenticateContext);
  const [data, setData] = useState([]);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [isEditMOdalOpen, setIsEditMOdalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [actualSelectedData, setActualSelectedData] = useState({});

  const getAllUserData = async () => {
    await axiosInstance
      .get(`/allUsers/${contextData?.user?.id}`, contextData?.config)
      .then((res) => {
        const response = res.data.data.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        setData(response || []);
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error.message, {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    if (ref.current && contextData?.token) {
      getAllUserData();
      ref.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData]);

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
        field: "username",
        headerName: "Username",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "email",
        headerName: "Email Address",
        cellStyle: { textAlign: "center" },
      },
      {
        field: "role",
        headerName: "Role",
        cellStyle: { textAlign: "center" },
        headerComponent: (data) => (
          <div className="flex gap-1 items-center justify-center w-full">
            <div>{data.displayName}</div>
            <button className="cursor-pointer">
              <BsArrowDownShort size={20} />
            </button>
          </div>
        ),
        cellRenderer: (props) => (props?.data?.role === "0" ? "User" : "Admin"),
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
                setActualSelectedData(props.data);
                setIsEditMOdalOpen(!isEditMOdalOpen);
              }}
            >
              <CiEdit size={25} />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => {
                setSelectedRowData(props.data);
                setActualSelectedData(props.data);
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

  const handleClickDeleteUser = async () => {
    await axiosInstance
      .delete(
        `/deleteUser/${contextData?.user?.id}/${selectedRowData?._id}`,
        contextData?.config
      )
      .then((res) => {
        if (res?.statusText === "OK") {
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          getAllUserData();
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
  const handleClickUpdateUser = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post(
        `/updateUser/${contextData?.user?.id}`,
        selectedRowData,
        contextData?.config
      )
      .then((res) => {
        if (res?.statusText === "OK") {
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          getAllUserData();
          setIsEditMOdalOpen(false);
          setSelectedRowData({});
        }
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error.message, {
          variant: "error",
        });
      });
  };

  const handleDownloadUserCSV = async () => {
    await axiosInstance
      .get(`/download/${contextData?.user?.id}`, {
        ...contextData?.config,
        responseType: "blob",
      })
      .then((res) => {
        if (res?.data) {
          const url = URL.createObjectURL(new Blob([res?.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "users.xlsx");
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url);
          enqueueSnackbar("Data exported successfully", {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      });
  };

  return (
    <>
      <div className="flex justify-center items-top h-5/6">
        <div className="ag-theme-quartz h-72 px-10 mt-20 w-full max-w-[1640px]">
          <div className="flex justify-end pb-4">
            <button
              className="bg-green-1 hover:bg-green-2 p-4 rounded-md"
              onClick={handleDownloadUserCSV}
            >
              Download users list (xlsx)
            </button>
          </div>
          <AgGridReact
            rowData={data}
            columnDefs={columnsAgGrid}
            defaultColDef={defaultColDefs}
            rowSelection="multiple"
            domLayout={data.length <= 5 ? undefined : "autoHeight"}
            reactiveCustomComponents
            suppressModelUpdateAfterUpdateTransaction={true}
            suppressDragLeaveHidesColumns={true}
            noRowsOverlayComponent={TablePlaceHolderHelper}
          />
        </div>
      </div>
      <Modal
        label="Update User Info"
        showModal={isEditMOdalOpen}
        closeModal={() => setIsEditMOdalOpen(false)}
        content={() => ({
          body: () => (
            <UpdateUserModalForm
              setSelectedRowData={setSelectedRowData}
              selectedRowData={selectedRowData}
            />
          ),
          footer: () => (
            <>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border text-white bg-primary-600 disabled:bg-primary-400 hover:bg-primary-700 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={handleClickUpdateUser}
                disabled={isEqual(actualSelectedData, selectedRowData)}
              >
                Update
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-red-600 bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsEditMOdalOpen(false)}
              >
                cancel
              </button>
            </>
          ),
        })}
      />
      <Modal
        label={
          <>
            Delete <b>{selectedRowData?.username || ""}</b>
          </>
        }
        showModal={isDeleteModelOpen}
        closeModal={() => setIsDeleteModelOpen(false)}
        content={() => ({
          body: () => (
            <>
              Are you sure you want to delete{" "}
              <b>{selectedRowData?.username || ""}</b> user?
            </>
          ),
          footer: () => (
            <>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border text-white bg-primary-600 disabled:bg-primary-400 hover:bg-primary-700 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={handleClickDeleteUser}
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
    </>
  );
};

export default Users;
