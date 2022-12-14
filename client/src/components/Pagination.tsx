import React, { FC } from "react";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
  pageCount: number;
};

export const Pagination: FC<PaginationProps> = ({ currentPage, onChangePage, pageCount }) => (
  <ReactPaginate
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={pageCount}
    forcePage={currentPage - 1}
  />
);
