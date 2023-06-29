import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle, getComments } from "utils/api";
import { ArticleReadSection } from "pages/article/read/ArticleReadSection";
import { ArticleVoteSection } from "pages/article/vote/ArticleVoteSection";
import { ArticleCommentSection } from "pages/article/comments/ArticleCommentSection";
import { ButtonBackLink } from "components/UI/button/ButtonBackLink";
import { LoadingItem } from "components/UI/LoadingItem";
import { ErrorPage } from "pages/error/ErrorPage";

export const ArticlePage = () => {
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
      <main className="mx-auto mb-10 w-full px-4 lg:container md:px-8 xl:px-16 2xl:px-32">
        <ButtonBackLink />
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
