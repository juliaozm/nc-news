import { CommentItem } from "components/comments/CommentItem";
import { LoadingItem } from "components/UI/LoadingItem";
import { CommentAdderForm } from "components/comments/CommentAdderForm";

export const ArticleCommentSection = ({ comments, setComments }) => {
  return (
    <section className="text-base 2xl:text-lg">
      <h2 className="mb-6 text-xl font-bold">Comments</h2>
      <CommentAdderForm setComments={setComments} />
      {comments.length === 0 ? (
        <LoadingItem />
      ) : (
        <ul>
          {comments.map((comment) => {
            return (
              <CommentItem
                key={comment.comment_id}
                comment={comment}
                setComments={setComments}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
};
