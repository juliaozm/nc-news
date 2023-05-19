import { useState, useContext, useEffect } from "react";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { UserContext } from "contexts/loggedinUser";
import { updateArticleVotes } from "utils/api";
import { toast } from "react-toastify";

export const ArticleVoteSection = ({ article }) => {
  const [activeBtn, setActiveBtn] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [updatedArticle, setUpdatedArticle] = useState({});

  useEffect(() => {
    loggedInUser.username ? setDisabledBtn(false) : setDisabledBtn(true);
  }, [loggedInUser]);

  useEffect(() => {
    if (updatedArticle.inc_votes !== undefined) {
      updateArticleVotes(article.article_id, updatedArticle).catch((err) => {
        console.log(err);
        toast.error("Your vote hasn't been counted!", {
          toastId: "error",
        });
      });
    }
  }, [updatedArticle]);

  const handleVote = (e) => {
    e.preventDefault();
    if (activeBtn === "") {
      article.votes += 1;
      setActiveBtn("like");
      setUpdatedArticle((values) => ({ ...values, inc_votes: +1 }));
      return;
    } else if (activeBtn === "like") {
      article.votes -= 1;
      setActiveBtn("none");
      setUpdatedArticle((values) => ({ ...values, inc_votes: -1 }));
      return;
    } else if (activeBtn === "none") {
      article.votes -= 1;
      setActiveBtn("dislike");
      setUpdatedArticle((values) => ({ ...values, inc_votes: -1 }));
    } else if (activeBtn === "dislike") {
      article.votes += 1;
      setActiveBtn("");
      setUpdatedArticle((values) => ({ ...values, inc_votes: +1 }));
    }
  };

  return (
    <div className="mb-6">
      <button
        onClick={handleVote}
        disabled={disabledBtn}
        className={
          disabledBtn
            ? "flex cursor-not-allowed items-center text-gray-500"
            : "flex items-center font-semibold text-gray-600"
        }
      >
        {!activeBtn || activeBtn === "none" ? (
          <>
            <IoMdThumbsUp />
            <span className="ml-2 mr-2">{article.votes}</span>
            <IoMdThumbsDown />
          </>
        ) : (
          ""
        )}
        {activeBtn === "like" ? (
          <>
            <IoMdThumbsUp className="fill-green-700" />
            <span className="ml-2 text-green-700">
              {article.votes} | Upvoted!
            </span>
          </>
        ) : (
          ""
        )}
        {activeBtn === "dislike" ? (
          <>
            <IoMdThumbsDown className="fill-red-600" />
            <span className="ml-2 text-red-600">
              {article.votes} | Downvoted!
            </span>
          </>
        ) : (
          ""
        )}
      </button>
    </div>
  );
};
