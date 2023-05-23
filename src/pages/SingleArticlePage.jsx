import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle, getComments } from "utils/api";
import { ArticleReadSection } from "components/articles/ArticleReadSection";
import { ArticleVoteSection } from "components/articles/ArticleVoteSection";
import { ArticleCommentSection } from "components/articles/ArticleCommentSection";
import { BackLink } from "components/UI/BackLink";
import { LoadingItem } from "components/UI/LoadingItem";
import { ErrorPage } from "pages/ErrorPage";

export const SingleArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
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

  if (error) {
    return <ErrorPage />;
  } else {
    return (
      <main className="mx-auto mb-10 w-full px-4 md:px-8 lg:w-[70rem] xl:px-16 ">
        <BackLink />
        <>
          {isLoading ? (
            <LoadingItem />
          ) : (
            <>
              <ArticleReadSection article={article} />
              <ArticleVoteSection article={article} />
              <ArticleCommentSection
                comments={comments}
                setComments={setComments}
              />
            </>
          )}
        </>
      </main>
    );
  }
};
