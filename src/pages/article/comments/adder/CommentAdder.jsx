import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { postNewComment } from "utils/api";
import { UserContext } from "contexts/loggedinUser";
import { AuthContext } from "contexts/authTokenContext";
import { CommentAdderForm } from "pages/article/comments/adder/CommentAdderForm";
import { toast } from "react-toastify";

export const CommentAdder = ({ setComments }) => {
  const { article_id } = useParams();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { accessToken } = useContext(AuthContext);
  const [key, setKey] = useState("");
  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    if (newComment.author && newComment.body) {
      const keyId = Date.now().toString();
      setKey(keyId);
      setComments((currComments) => [
        { ...newComment, comment_id: key },
        ...currComments,
      ]);
      postNewComment(
        article_id,
        {
          username: newComment.author,
          body: newComment.body,
        },
        accessToken
      )
        .then((posted) => {
          const { comment_id } = posted.data.comment;
          setComments((currComments) => {
            return [...currComments].filter((comment) => {
              if (comment.comment_id === key) {
                return (comment.comment_id = comment_id);
              } else {
                return comment;
              }
            });
          });
        })
        .catch((err) => {
          setComments((currComments) => {
            return [...currComments].filter(
              (comment) => comment.comment_id !== key
            );
          });
          if (err.response.status === 403) {
            toast.error("Your session has expired, please login", {
              toastId: "error",
            });
            setLoggedInUser({});
          } else {
            toast.error("Your comment hasn't been published!", {
              toastId: "error",
            });
          }
          console.log(err);
        });
    }
  }, [newComment]);

  return (
    <CommentAdderForm
      article_id={article_id}
      setNewComment={setNewComment}
      loggedInUser={loggedInUser}
    />
  );
};
