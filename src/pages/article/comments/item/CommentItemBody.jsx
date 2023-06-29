import { ButtonDelete } from "components/UI/button/ButtonDelete";
import { UserAvatar } from "components/UI/UserAvatar";

export const CommentItemBody = ({
  comment,
  setDeletedComment,
  setAnimate,
  btnDeleteActive,
}) => {
  const date = new Date(Date.parse(comment.created_at)).toLocaleString(
    "en-GB",
    { timeZone: "UTC" }
  );

  const handleDeleteComment = (e) => {
    e.preventDefault();
    setDeletedComment(comment);
    setAnimate(true);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <UserAvatar user={comment}></UserAvatar>
          <h3 className="ml-2 text-sm font-semibold capitalize md:ml-3 md:text-base">
            {comment.author}
          </h3>
        </div>

        <div className="flex items-center text-gray-500">
          <span className="text-xs md:text-base">{date}</span>
          {btnDeleteActive && (
            <ButtonDelete handleDelete={handleDeleteComment} />
          )}
        </div>
      </div>
      <p className="font-base mb-2 mt-2">{comment.body}</p>
    </>
  );
};
