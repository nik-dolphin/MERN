import React, { useEffect, useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PAGE_NUM_TO_SHOW = 6;

const Pagination = ({
  dataList,
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  GetProductsList,
  setShowProductsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    GetProductsList({ offset: newPage });
  };

  const generatePageNumbers = useMemo(() => {
    let start = currentPage - Math.floor(PAGE_NUM_TO_SHOW / 2);
    if (start < 1) {
      start = 1;
    }
    let end = start + PAGE_NUM_TO_SHOW - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - PAGE_NUM_TO_SHOW + 1;
      if (start < 1) {
        start = 1;
      }
    }

    const pageNumbers = [];

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }, [currentPage, totalPages]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  useEffect(() => {
    setShowProductsPerPage(dataList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dataList, itemsPerPage]);

  return (
    <>
      <div className="flex items-center justify-start md:justify-center space-x-5 gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 md:px-4 py-2 md:py-2 text-white bg-gray-950 hover:bg-gray-800 hover:shadow-lg disabled:bg-slate-700 h-12 w-12 rounded-full transition-colors flex justify-center items-center"
          style={{ margin: "0" }}
          aria-label="arrow-left"
        >
          <FaChevronLeft isDisabled={currentPage === 1} size={18} />
        </button>
        {generatePageNumbers?.map((pageNumber) => (
          <button
            key={pageNumber}
            style={{ margin: "0" }}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 md:px-4 py-2 md:py-2 text-white ${
              pageNumber === currentPage
                ? "border border-theme-alter-color cursor-default"
                : "text-gray-600"
            } transition-colors font-paregraph-p3-medium bg-gray-950 hover:bg-gray-800 hover:shadow-lg h-12 w-12 rounded-full`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 md:px-4 py-2 md:py-2 text-white bg-gray-950 hover:bg-gray-800 disabled:bg-slate-700 hover:shadow-lg h-12 w-12 rounded-full transition-colors flex justify-center items-center"
          style={{ margin: "0" }}
          aria-label="arrow-right"
        >
          <FaChevronRight
            isDisabled={currentPage === totalPages || totalPages === 0}
          />
        </button>
      </div>
      {/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={handleClickPrevious}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleClickNext}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={handleClickPrevious}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            {generatePageNumbers.map((button, index) =>
              button === "..." ? (
                <span
                  key={index}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                >
                  {button}
                </span>
              ) : (
                <button
                  key={button}
                  onClick={() => handleClickPage(button)}
                  aria-current={currentPage === button ? "page" : undefined}
                  className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === button
                      ? "bg-indigo-600 text-white"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  } focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {button}
                </button>
              )
            )}
            <button
              onClick={handleClickNext}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <FaChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default Pagination;
