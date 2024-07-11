import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = 97;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const items = [
    {
      id: 1,
      title: "Back End Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 2,
      title: "Front End Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 3,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
  ];

  const handleClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPage = (page) => {
    setCurrentPage(page);
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 7; // Max number of buttons to show (including ellipses)
    const delta = 2; // How many pages to show around the current page

    if (totalPages <= maxButtons) {
      // If the total pages are less than or equal to maxButtons, show all pages
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      const start = Math.max(currentPage - delta, 1);
      const end = Math.min(currentPage + delta, totalPages);

      if (start > 1) {
        buttons.push(1);
        if (start > 2) {
          buttons.push("...");
        }
      }

      for (let i = start; i <= end; i++) {
        buttons.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          buttons.push("...");
        }
        buttons.push(totalPages);
      }
    }

    return buttons;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
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
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <button
              onClick={handleClickPrevious}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            {getPaginationButtons().map((button, index) =>
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
    </div>
  );
};

export default Pagination;
