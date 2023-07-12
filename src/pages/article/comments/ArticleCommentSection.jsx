import { CommentItem } from "pages/article/comments/item/CommentItem";
import { CommentAdder } from "pages/article/comments/adder/CommentAdder";
import { LoadingItem } from "components/UI/LoadingItem";

export const ArticleCommentSection = ({ comments, setComments }) => {
  return (
    <section className="mx-auto mt-6 text-base md:max-w-[900px] 2xl:text-lg">
      <h2 className="mb-6 text-xl font-bold">Comments</h2>
      <CommentAdder setComments={setComments} />
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
