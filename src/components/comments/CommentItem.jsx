import { useContext, useEffect, useState } from "react";
import { UserContext } from "contexts/loggedinUser";
import { deleteComment } from "utils/api";
import { ButtonDelete } from "components/UI/ButtonDelete";
import { toast } from "react-toastify";
// import { CommentVote } from "components/comments/CommentVote";

export const CommentItem = ({ comment, setComments }) => {
  const { loggedInUser } = useContext(UserContext);
  const [deletedComment, setDeletedComment] = useState({});
  const [btnActive, setBtnActive] = useState(false);
  const [animate, setAnimate] = useState(false);
  const date = new Date(Date.parse(comment.created_at)).toLocaleString(
    "en-GB",
    { timeZone: "UTC" }
  );

  useEffect(() => {
    if (
      loggedInUser.username === "weegembump" &&
      comment.author === "weegembump"
    ) {
      setBtnActive(true);
    }
  }, [loggedInUser, comment]);

  const handleDeleteComment = (e) => {
    e.preventDefault();
    setDeletedComment(comment);
    setAnimate(true);
  };

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
      deleteComment(deletedComment.comment_id).catch((err) => {
        console.log(err);
        setComments((currComments) => [deletedComment, ...currComments]);
        setAnimate(false);
        toast.error("Your comment hasn't been deleted!", {
          toastId: "error",
        });
      });
    }
  }, [deletedComment]);

  return (
    <li className={"mb-4 md:mb-6 xl:mb-8 " + (animate ? "slide-left" : "")}>
      <div className="flex justify-between">
        <h3 className="mb-1 font-semibold capitalize">{comment.author}</h3>
        <div className="mb-1 flex items-center">
          <span className="text-gray-500 ">{date}</span>
          {btnActive ? <ButtonDelete handleDelete={handleDeleteComment} /> : ""}
        </div>
      </div>
      <p className="font-base mb-2">{comment.body}</p>
      {/* <CommentVote comment={comment} />  No API call for this feature */}
    </li>
  );
};
