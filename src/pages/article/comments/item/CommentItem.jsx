import { useContext, useEffect, useState } from "react";
import { UserContext } from "contexts/loggedinUser";
import { AuthContext } from "contexts/authTokenContext";
import { deleteComment } from "utils/api";
import { CommentItemBody } from "pages/article/comments/item/CommentItemBody";
import { CommentItemVote } from "pages/article/comments/item/CommentItemVote";
import { toast } from "react-toastify";

export const CommentItem = ({ comment, setComments }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { accessToken } = useContext(AuthContext);
  const [deletedComment, setDeletedComment] = useState({});
  const [btnDeleteActive, setBtnDeleteActive] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    loggedInUser.username === comment.author
      ? setBtnDeleteActive(true)
      : setBtnDeleteActive(false);
  }, [loggedInUser, comment]);

  useEffect(() => {
    if (deletedComment.comment_id) {
      setTimeout(
        () =>
          setComments((currComments) => {
            return [...currComments].filter(
              (comment) => comment.comment_id !== deletedComment.comment_id
            );
          }),
        500
      );
      deleteComment(deletedComment.comment_id, accessToken).catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          toast.error("Your session has expired, please login", {
            toastId: "error",
          });
          setLoggedInUser({});
        } else {
          toast.error("Your comment hasn't been deleted!", {
            toastId: "error",
          });
        }
        setComments((currComments) => [deletedComment, ...currComments]);
        setAnimate(false);
      });
    }
  }, [deletedComment]);

  return (
    <li className={"mb-6 xl:mb-8 " + (animate ? "slide-left" : "")}>
      <CommentItemBody
        comment={comment}
        setDeletedComment={setDeletedComment}
        setAnimate={setAnimate}
        btnDeleteActive={btnDeleteActive}
      />
      <CommentItemVote comment={comment} accessToken={accessToken} />
    </li>
  );
};
