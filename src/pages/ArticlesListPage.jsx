import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticlesList, getTopicsList } from "utils/api";
import { ArticlesList } from "components/articles/ArticlesList";
import { SelectTopics } from "components/articles/SelectTopics";
import { SelectSortBy } from "components/articles/SelectSortBy";
import { ToggleOrder } from "components/articles/ToggleOrder";
import { LoadingItem } from "components/UI/LoadingItem";
import { ErrorPage } from "pages/ErrorPage";
import { toast } from "react-toastify";

export const ArticlesListPage = () => {
  const [topicsList, setTopicsList] = useState([]);
  const [topic, setTopic] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [articlesList, setArticlesList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

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
  }, [error]);

  useEffect(() => {
    setError(null);
    getArticlesList(topic, sortBy, order)
      .then((response) => {
        setArticlesList(response.data.articles);
        setSearchParams({
          topic: topic,
          sort_by: sortBy,
          order: order,
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        toast.error("The request wasn't resolved", {
          toastId: "error",
        });
      });
  }, [topic, sortBy, order, searchParams]);

  useEffect(() => {
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    if (newUrl !== window.location.href) {
      window.history.replaceState(null, "", newUrl);
    }
  }, [searchParams]);

  return (
    <>
      {error ? (
        <ErrorPage />
      ) : (
        <main className="mx-auto mb-10 px-4 2xl:container lg:px-8 xl:px-16">
          <section className="mb-4 mt-4 flex items-end justify-between">
            <SelectTopics
              topic={topic}
              topicList={topicsList}
              setTopic={setTopic}
            />
            <div className="z-50 flex">
              <SelectSortBy sortBy={sortBy} setSortBy={setSortBy} />
              <ToggleOrder order={order} setOrder={setOrder} />
            </div>
          </section>
          <section>
            {articlesList.length === 0 && <LoadingItem />}
            <ArticlesList articles={articlesList} />
          </section>
        </main>
      )}
    </>
  );
};
