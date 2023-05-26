import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { postNewComment } from "utils/api";
import { UserContext } from "contexts/loggedinUser";
import { ButtonClear } from "components/UI/ButtonClear";
import { ButtonLink } from "components/UI/ButtonLink";
import { TextInput } from "components/UI/TextInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CommentAdderForm = ({ setComments }) => {
  const { article_id } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [key, setKey] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [newComment, setNewComment] = useState({});
  const [btnActive, setBtnActive] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    newCommentText ? setBtnActive(true) : setBtnActive(false);
  }, [newCommentText]);

  const validationForm = () => {
    setError(false);
    if (!loggedInUser.username || !loggedInUser.username == undefined) {
      setError(true);
      toast.error("Please login to post a comment", {
        toastId: "error",
      });
    }
    if (!newCommentText || newCommentText == undefined) {
      setError(true);
      toast.error("Please enter a valid comment", {
        toastId: "error",
      });
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    validationForm();
    if (!error) {
      const newComment = {
        author: loggedInUser.username,
        body: newCommentText,
        votes: 0,
        created_at: new Date(),
        article_id: +article_id,
      };
      setNewComment(newComment);
      setNewCommentText("");
    }
  };

  useEffect(() => {
    if (newComment.author && newComment.body) {
      const keyId = Date.now().toString();
      setKey(keyId);
      setComments((currComments) => [
        { ...newComment, comment_id: key },
        ...currComments,
      ]);
      postNewComment(article_id, {
        username: newComment.author,
        body: newComment.body,
      })
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
          console.log(err);
          toast.error("Your comment hasn't been published!", {
            toastId: "error",
          });
        });
    }
  }, [newComment]);

  return (
    <form onSubmit={handleSubmitComment} className="relative mb-6">
      <TextInput
        name="body"
        placeholder="Add new comment"
        minLength={5}
        maxLength={200}
        required={true}
        value={newCommentText}
        autoComplete="off"
        setNewValue={setNewCommentText}
      />
      {btnActive ? (
        <>
          <ButtonClear setDelete={() => setNewCommentText("")} />
          <ButtonLink text={"Add comment"} />
        </>
      ) : (
        ""
      )}
    </form>
  );
};
