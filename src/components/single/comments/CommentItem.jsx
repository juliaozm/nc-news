import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/loggedinUser";
import { deleteComment } from "../../../utils/api";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

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
    <li className={"comment-item " + (animate ? "slide-left" : "")}>
      <div className="header">
        <h3>{comment.author}</h3>
        <div className="date-info">
          <span className="date">{date}</span>
          {btnActive ? (
            <button onClick={handleDeleteComment} className="btn-delete">
              <MdDelete />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="text">{comment.body}</p>
      <div className="vote">
        <button className="up">
          {" "}
          <IoMdThumbsUp />{" "}
        </button>
        <button className="down">
          {" "}
          <IoMdThumbsDown />{" "}
        </button>
        {comment.votes > 0 ? (
          <span className="green">{comment.votes}</span>
        ) : (
          <span className="red">{comment.votes}</span>
        )}
      </div>
    </li>
  );
};
