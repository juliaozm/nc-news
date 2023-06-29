import { useMemo, useState } from "react";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";

export const Pagination = ({ totalCount, page, limit, setPage }) => {
  const [pageCount, setPageCount] = useState(1);
  const pageRange = [];
  const defaultButtonStyles =
    "flex h-10 w-10 items-center justify-center rounded-lg bg-green-700 font-mono text-lg font-medium text-white outline-none transition-all hover:bg-green-600 active:bg-green-500";

  useMemo(() => {
    setPageCount(Math.ceil(totalCount / limit));
  }, [totalCount, limit]);

  const pages = useMemo(() => {
    for (let i = 1; i <= pageCount; i++) {
      pageRange.push(i);
    }
    if (page < 3) {
      return pageRange.slice(0, 5);
    }
    if (pageCount - page < 3) {
      return pageRange.slice(-5);
    }
    return pageRange.slice(page - 3, page + 2);
  }, [page, pageCount]);

  const showNext = useMemo(() => {
    return pageCount - page > 0;
  }, [page, pageCount]);

  const showPrev = useMemo(() => {
    return page > 1;
  }, [page]);

  const showPages = useMemo(() => {
    return pages.length !== 1;
  }, [pages.length]);

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };

  if (showPages) {
    return (
      <div className="mb-8 mt-8 flex items-center justify-center">
        {showPrev && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className={defaultButtonStyles}
          >
            <RiArrowLeftCircleFill size={24} />
          </button>
        )}
        <ul className="ml-2 mr-2 flex items-center">
          {pages.map((pageNum) => {
            return (
              <li key={pageNum} className="ml-1 mr-1">
                <button
                  className={`${
                    pageNum === page && "!bg-green-500"
                  } ${defaultButtonStyles}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              </li>
            );
          })}
        </ul>
        {showNext && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className={defaultButtonStyles}
          >
            <RiArrowRightCircleFill size={24} />
          </button>
        )}
      </div>
    );
  }
};
