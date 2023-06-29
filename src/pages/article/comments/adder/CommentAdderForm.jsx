import { useState, useEffect } from "react";
import { ButtonClear } from "components/UI/button/ButtonClear";
import { ButtonLink } from "components/UI/button/ButtonLink";
import { TextInput } from "components/UI/input/TextInput";
import { toast } from "react-toastify";

export const CommentAdderForm = ({
  article_id,
  setNewComment,
  loggedInUser,
}) => {
  const [newCommentText, setNewCommentText] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    newCommentText ? setBtnActive(true) : setBtnActive(false);
  }, [newCommentText]);

  const validationForm = () => {
    setError(false);
    if (loggedInUser.firebase) {
      setError(true);
      toast.error("Sorry but Google accounts currently can't post", {
        toastId: "error",
      });
    }
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

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    validationForm();
    if (!error) {
      const newComment = {
        author: loggedInUser.username,
        body: newCommentText,
        votes: 0,
        created_at: new Date(),
        article_id: +article_id,
        avatar_url: loggedInUser.avatar_url,
      };
      setNewComment(newComment);
      setNewCommentText("");
    }
  };

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
          <ButtonLink
            text={"Add comment"}
            onClick={() => console.log("click")}
          />
        </>
      ) : (
        ""
      )}
    </form>
  );
};
