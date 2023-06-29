import { useState, useEffect, useContext } from "react";
import { updateCommentVotes } from "utils/api";
import { UserContext } from "contexts/loggedinUser";
import { VotesItem } from "components/UI/VotesItem";
import { toast } from "react-toastify";

export const CommentItemVote = ({ comment, accessToken }) => {
  const [updatedComment, setUpdatedComment] = useState({});
  const { setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    if (updatedComment.inc_votes) {
      updateCommentVotes(comment.comment_id, updatedComment, accessToken).catch(
        (err) => {
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
          console.log(err);
        }
      );
    }
  }, [updatedComment]);

  return <VotesItem item={comment} setUpdatedVotes={setUpdatedComment} />;
};
