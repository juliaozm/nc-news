import { useMemo, useState } from "react";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";

export const Pagination = ({ totalCount, page, limit, setPage }) => {
  const defaulButtonStyles =
    "flex h-10 w-10 items-center justify-center rounded-lg bg-green-700 font-mono text-lg font-medium text-white outline-none hover:bg-green-600 transition-all active:bg-green-500";
  const activeButtonStyles = "bg-green-500 hover:bg-green-600";
  const [pageCount, setPageCount] = useState(1);
  const pageRange = [];
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

  //   const handleScrollToTop = () => {
  //     window.scroll({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    // handleScrollToTop();
  };

  if (showPages) {
    return (
      <section className="mb-8 mt-8 flex items-center justify-center">
        {showPrev && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-700 font-mono text-lg font-medium text-white outline-none hover:bg-green-600 hover:transition-all active:bg-green-500"
          >
            <RiArrowLeftCircleFill size={24} />
          </button>
        )}

        <ul className="ml-2 mr-2 flex items-center">
          {pages.map((pageNum) => {
            return (
              <li key={pageNum} className="ml-1 mr-1">
                <button
                  className={
                    pageNum === page
                      ? `${activeButtonStyles} ${defaulButtonStyles}`
                      : defaulButtonStyles
                  }
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
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-700 font-mono text-lg font-medium text-white outline-none hover:bg-green-600 hover:transition-all active:bg-green-500"
          >
            <RiArrowRightCircleFill size={24} />
          </button>
        )}
      </section>
    );
  }
};
