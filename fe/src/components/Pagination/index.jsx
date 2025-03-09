import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";

const cx = classNames.bind(styles);

function Pagination({
  handlePageClick,
  totalRecords,
  displayNumberRecords,
  totalPages,
  currentPage,
}) {
  return (
    <div className={cx("Pagination", "flex justify-between align-center")}>
      <div className={cx("flex align-center gap-8", "Pagination-left")}>
        <p className="sm">Đang xem:</p>
        <div>
          <label className={cx("md", "Pagination-page-size")}>
            {displayNumberRecords}
          </label>
        </div>
        <p className="sm">của {totalRecords}</p>
      </div>
      <ReactPaginate
        className={cx("Pagination-container")}
        nextLabel={
          <>
            <div className="flex align-center gap-8">
              <label className="sm">Tiếp</label>
              <svg
                width="20"
                height="20"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                  stroke="var(--gray-700)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </>
        }
        nextLinkClassName={cx("Pagination-next-link")}
        onPageChange={handlePageClick}
        pageCount={totalPages}
        previousLabel={
          <>
            <div className="flex align-center gap-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.16602 10H15.8327M4.16602 10L9.16602 5M4.16602 10L9.16602 15"
                  stroke="var(--gray-700)"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <label htmlFor="" className="sm">
                Trước
              </label>
            </div>
          </>
        }
        previousLinkClassName={cx("Pagination-previous-link")}
        pageClassName={cx("Pagination-item")}
        previousClassName={cx("Pagination-left-item", "Pagination-item")}
        nextClassName={cx("Pagination-item", "Pagination-right-item")}
        breakLabel="..."
        breakClassName={cx("Pagination-item", "Pagination-dots")}
        activeClassName={cx("Pagination-selected")}
        pageLinkClassName={cx("Pagination-link")}
        forcePage={currentPage} // reset page when records change
      />
    </div>
  );
}

Pagination.propTypes = {
  handlePageClick: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  records: PropTypes.number.isRequired,
  displayNumberRecords: PropTypes.node.isRequired,
};

export default Pagination;
