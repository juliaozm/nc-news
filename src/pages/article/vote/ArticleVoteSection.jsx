import { useState, useContext, useEffect } from "react";
import { AuthContext } from "contexts/authTokenContext";
import { UserContext } from "contexts/loggedinUser";
import { updateArticleVotes } from "utils/api";
import { VotesItem } from "components/UI/VotesItem";
import { toast } from "react-toastify";

export const ArticleVoteSection = ({ article }) => {
  const { accessToken } = useContext(AuthContext);
  const { setLoggedInUser } = useContext(UserContext);
  const [updatedArticle, setUpdatedArticle] = useState({});

  useEffect(() => {
    if (updatedArticle.inc_votes) {
      updateArticleVotes(article.article_id, updatedArticle, accessToken).catch(
        (err) => {
          console.log(err);
          if (err.response.status === 403) {
            toast.error("Your session has expired, please login", {
              toastId: "error",
            });
            setLoggedInUser({});
          } else {
            toast.error("Your vote hasn't been counted!", {
              toastId: "error",
            });
          }
        }
      );
    }
  }, [updatedArticle]);

  return <VotesItem item={article} setUpdatedVotes={setUpdatedArticle} />;
};
