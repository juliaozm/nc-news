import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticlesList, fetchTopicsList } from "../utils/api";
import { ArticlesList } from "./ArticlesList";
import { ArticleTopics } from "./ArticleTopics";
import { ArticlesSortBy } from "./ArticlesSortBy";
import { LoadingItem } from "./LoadingItem";

export const ArticlesListPage = () => {
  const [topicList, setTopics] = useState([]);
  const [topic, setTopic] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [articlesList, setArticlesList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchTopicsList().then((topicsFromApi) => {
      setTopics(topicsFromApi.data.topics);
    });
  }, []);

  useEffect(() => {
    const topicFromUrl = searchParams.get("topic");
    const sortByFromUrl = searchParams.get("sort_by");
    const orderFromUrl = searchParams.get("order");
    setTopic(topicFromUrl || "all");
    setSortBy(sortByFromUrl || "created_at");
    setOrder(orderFromUrl || "desc");
  }, []);

  useEffect(() => {
    setLoading(true);
    getArticlesList(topic, sortBy, order)
      .then((response) => {
        setArticlesList(response.data.articles);
        setSearchParams({
          topic: topic,
          sort_by: sortBy,
          order: order,
        });
        setLoading(false);
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState(null, "", newUrl);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [topic, sortBy, order, searchParams]);

  return (
    <main className="articles-page">
      <ArticleTopics topic={topic} topicList={topicList} setTopic={setTopic} />
      <ArticlesSortBy
        order={order}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setOrder={setOrder}
      />
      {isLoading && <LoadingItem />}
      {articlesList.length > 0 && <ArticlesList articles={articlesList} />}
    </main>
  );
};
