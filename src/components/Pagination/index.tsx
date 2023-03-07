import React from "react";

interface IProps {
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  total: number;
  pageSize: number;
}

const Pagination = ({
  setCurrentPage,
  currentPage,
  total,
  pageSize,
}: IProps) => {
  return (
    <div className="table-footer">
      <p className="page-no">Showing page {currentPage + 1}</p>
      <div className="page-box">
        <button
          onClick={() => setCurrentPage && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="page-button"
        >
          Prev
        </button>
        <button
          className="page-button"
          onClick={() => setCurrentPage && setCurrentPage(currentPage + 1)}
          disabled={total < pageSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
