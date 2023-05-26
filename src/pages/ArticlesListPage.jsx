import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticlesList, getTopicsList } from "utils/api";
import { ArticlesList } from "components/articles/ArticlesList";
import { SelectTopics } from "components/articles/SelectTopics";
import { SelectSortBy } from "components/articles/SelectSortBy";
import { SelectLimit } from "components/articles/SelectLimit";
import { ToggleOrder } from "components/articles/ToggleOrder";
import { LoadingItem } from "components/UI/LoadingItem";
import { toast } from "react-toastify";
import { Pagination } from "components/UI/Pagination";
import { ToggleOpenFilters } from "components/articles/ToggleOpenFilters";

export const ArticlesListPage = () => {
  const [topicsList, setTopicsList] = useState([]);
  const [topic, setTopic] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [limit, setLimit] = useState("");
  const [page, setPage] = useState("");
  const [totalArticlesCount, setTotalArticlesCount] = useState("");
  const [articlesList, setArticlesList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [isFilterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    getTopicsList().then((topicsFromApi) => {
      const topics = topicsFromApi.data.topics.map((topic) => topic.slug);
      setTopicsList(topics);
    });
  }, []);

  useEffect(() => {
    setTopic(searchParams.get("topic") || "all");
    setSortBy(searchParams.get("sort_by") || "created_at");
    setOrder(searchParams.get("order") || "desc");
    setLimit(searchParams.get("limit") || "10");
    setPage(searchParams.get("page") || 1);
  }, [error]);

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

  // useEffect(() => {
  //   const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  //   if (newUrl !== window.location.href) {
  //     window.history.replaceState(null, "", newUrl);
  //   }
  // }, [searchParams]);

  return (
    <main className="mx-auto mb-10 px-4 2xl:container lg:px-8 xl:px-16">
      <div className="my-2 sm:hidden ">
        <ToggleOpenFilters
          isFilterOpen={isFilterOpen}
          setFilterOpen={setFilterOpen}
          className="my-2 sm:hidden"
        />
      </div>
      <section
        className={`${
          isFilterOpen ? "flex flex-wrap" : "hidden"
        } z-50 mb-2 mt-2 items-end justify-between sm:flex sm:flex-nowrap`}
      >
        <div className="flex w-full flex-wrap items-center justify-between sm:flex-nowrap sm:justify-start">
          <SelectTopics
            topic={topic}
            topicList={topicsList}
            setTopic={setTopic}
            setPage={setPage}
          />
          <SelectLimit limit={limit} setLimit={setLimit} setPage={setPage} />
        </div>
        <div className="flex w-full flex-wrap items-center justify-start justify-between sm:flex-nowrap sm:justify-end">
          <SelectSortBy
            sortBy={sortBy}
            setSortBy={setSortBy}
            setPage={setPage}
          />
          <ToggleOrder order={order} setOrder={setOrder} setPage={setPage} />
        </div>
      </section>
      {articlesList.length === 0 ? (
        <LoadingItem />
      ) : (
        <section>
          <ArticlesList articles={articlesList} />
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
