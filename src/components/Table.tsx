import React, { useState } from "react";
import { TableProps } from "../types";

const ITEMS_PER_PAGE = 10;
const PAGES_PER_GROUP = 5;
interface State {
  currentPage: number;
}
const Table: React.FC<TableProps> = ({ data, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const notFirstGroup = currentPage > PAGES_PER_GROUP;
  const notLastGroup = currentPage <= totalPages - PAGES_PER_GROUP;

  const getPageNumbers = () => {
    const totalGroups = Math.ceil(totalPages / PAGES_PER_GROUP);
    const currentGroup = Math.ceil(currentPage / PAGES_PER_GROUP);
    const startPage = (currentGroup - 1) * PAGES_PER_GROUP + 1;
    const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);
    const pageNumbers: number[] = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const tableHeaders = ["ID", "Nama", "Jabatan", "Jenis Kelamin", "Alamat"];

  console.log(currentPage);
  return (
    <div>
      <table className="w-full  border-collapse border border-gray-300 bg-white">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} className="border border-gray-300 px-4 py-2">
                {header}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-1">{item.id}</td>
              <td className="border border-gray-300 px-4 py-1">{item.nama}</td>
              <td className="border border-gray-300 px-4 py-1">
                {item.jabatan}
              </td>
              <td className="border border-gray-300 px-4 py-1">
                {item.jenis_kelamin}
              </td>
              <td className="border border-gray-300 px-4 py-1">
                {item.alamat}
              </td>
              <td className="border border-gray-300 px-4 py-1flex justify-center space-x-2">
                <button
                  className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                  onClick={() => onEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>

        {notFirstGroup && (
          <React.Fragment>
            <button
              className={` bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-1`}
              onClick={() =>
                setCurrentPage(
                  (prevPage) =>
                    prevPage -
                    PAGES_PER_GROUP +
                    PAGES_PER_GROUP -
                    (prevPage % PAGES_PER_GROUP
                      ? prevPage % PAGES_PER_GROUP
                      : PAGES_PER_GROUP)
                )
              }
            >
              ...
            </button>
          </React.Fragment>
        )}

        {pageNumbers.map((pageNumber, index) => (
          <React.Fragment key={index}>
            <button
              className={`${
                currentPage === pageNumber ? "bg-green-500" : "bg-blue-500"
              }  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-1`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          </React.Fragment>
        ))}

        {notLastGroup && (
          <React.Fragment>
            <button
              className={` bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-1`}
              onClick={() =>
                setCurrentPage(
                  (prevPage) =>
                    prevPage +
                    PAGES_PER_GROUP -
                    ((prevPage + 5) % PAGES_PER_GROUP
                      ? (prevPage + 4) % PAGES_PER_GROUP
                      : PAGES_PER_GROUP - 1)
                )
              }
            >
              ...
            </button>
          </React.Fragment>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={endIndex >= data.length}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Table;
