import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle, getComments, updateArticleVotes } from "../../utils/api";
import { ReadingSection } from "./ReadingSection";
import { CommentSection } from "./comments/CommentSection";
import { BackLink } from "../header/BackLink";
import { LoadingItem } from "../LoadingItem";
import { ErrorComponent } from "../ErrorComponent";
import { toast } from "react-toastify";

export const SingleArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [updatedArticle, setUpdatedArticle] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    Promise.all([getArticle(article_id), getComments(article_id)])
      .then(([articleFromAPI, commentsFromApi]) => {
        setArticle(articleFromAPI.data.article);
        setLoading(false);
        setComments(commentsFromApi.data.comments);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  }, [article_id]);

  useEffect(() => {
    if (updatedArticle.inc_votes !== undefined) {
      updateArticleVotes(article_id, updatedArticle).catch((err) => {
        console.log(err);
        toast.error("Your vote hasn't been counted!", {
          toastId: "error",
        });
      });
    }
  }, [updatedArticle]);

  if (error) {
    return <ErrorComponent error={error} />;
  } else {
    return isLoading ? (
      <LoadingItem />
    ) : (
      <main className="container">
        <BackLink />
        <ReadingSection
          article={article}
          setUpdatedArticle={setUpdatedArticle}
        />
        <CommentSection comments={comments} setComments={setComments} />
      </main>
    );
  }
};
