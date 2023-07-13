import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticlesList } from "utils/api";
import { ArticleFiltersSection } from "pages/articlesList/filters/ArticleFiltersSection";
import { ArticleCardsSection } from "pages/articlesList/cards/ArticleCardsSection";
import { LoadingItem } from "components/UI/LoadingItem";
import { Pagination } from "components/UI/Pagination";
import { toast } from "react-toastify";

export const ArticlesListPage = () => {
  const [articlesList, setArticlesList] = useState([]);
  const [topic, setTopic] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [limit, setLimit] = useState("");
  const [page, setPage] = useState("");
  const [totalArticlesCount, setTotalArticlesCount] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    getArticlesList(topic, sortBy, order, page, limit)
      .then((response) => {
        setArticlesList(response.data.articles);
        // setting queries to the URL
        setSearchParams({
          topic: topic,
          sort_by: sortBy,
          order: order,
          page: page,
          limit: limit,
        });
        setTotalArticlesCount(response.data.total_count);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        toast.error("The request wasn't resolved", {
          toastId: "error",
        });
      });
  }, [topic, sortBy, order, page, limit, searchParams]);

  useMemo(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [articlesList]);

  return (
    <main className="mx-auto mb-10 px-4 lg:container">
      <ArticleFiltersSection
        setTopic={setTopic}
        topic={topic}
        setSortBy={setSortBy}
        sortBy={sortBy}
        setOrder={setOrder}
        order={order}
        setLimit={setLimit}
        limit={limit}
        setPage={setPage}
        searchParams={searchParams}
        error={error}
      />
      {articlesList.length === 0 ? (
        <LoadingItem />
      ) : (
        <section>
          <ArticleCardsSection articles={articlesList} />
          <Pagination
            totalCount={totalArticlesCount}
            page={page}
            limit={limit}
            setPage={setPage}
          />
        </section>
      )}
    </main>
  );
};
