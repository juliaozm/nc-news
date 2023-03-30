import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticlesList, getTopicsList } from "../../utils/api";
import { ArticlesList } from "./ArticlesList";
import { ArticleTopics } from "./ArticleTopics";
import { ArticlesSortBy } from "./ArticlesSortBy";
import { LoadingItem } from "../LoadingItem";
import { ErrorComponent } from "../ErrorComponent";
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
      setTopicsList(topicsFromApi.data.topics);
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
    <main className="articles-page">
      <ArticleTopics topic={topic} topicList={topicsList} setTopic={setTopic} />
      {error ? (
        <ErrorComponent error={error} />
      ) : (
        <div>
          {articlesList.length === 0 && <LoadingItem />}
          <ArticlesSortBy
            order={order}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setOrder={setOrder}
          />
          <ArticlesList articles={articlesList} />
        </div>
      )}
    </main>
  );
};
