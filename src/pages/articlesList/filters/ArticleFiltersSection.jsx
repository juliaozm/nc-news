import { useState, useEffect } from "react";
import { getTopicsList } from "utils/api";
import { SelectTopics } from "pages/articlesList/filters/SelectTopics";
import { SelectSortBy } from "pages/articlesList/filters/SelectSortBy";
import { SelectLimit } from "pages/articlesList/filters/SelectLimit";
import { ToggleOrder } from "pages/articlesList/filters/ToggleOrder";
import { ToggleOpenFilters } from "pages/articlesList/filters/ToggleOpenFilters";

export const ArticleFiltersSection = ({
  setTopic,
  topic,
  setSortBy,
  sortBy,
  setOrder,
  order,
  setLimit,
  limit,
  setPage,
  searchParams,
  error,
}) => {
  const [topicsList, setTopicsList] = useState([]);
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

  return (
    <>
      <div className="mb-4 mt-4 sm:hidden">
        <ToggleOpenFilters
          isFilterOpen={isFilterOpen}
          setFilterOpen={setFilterOpen}
        />
      </div>
      <section
        className={`${
          isFilterOpen ? "flex flex-wrap" : "hidden"
        } z-50 mb-4 mt-4 items-end justify-between sm:flex sm:flex-nowrap lg:px-4`}
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
    </>
  );
};
