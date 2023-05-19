import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io";
export const CommentVote = ({ comment }) => {
  return (
    /* No API call for this feature*/
    <div className="flex items-center">
      <button className="text-gray-700 ">
        {" "}
        <IoMdThumbsUp />{" "}
      </button>
      <button className="text-gray-700 ">
        {" "}
        <IoMdThumbsDown />{" "}
      </button>
      {comment.votes > 0 ? (
        <span className="ml-4 text-green-700">{comment.votes}</span>
      ) : (
        <span className="ml-4 text-red-700">{comment.votes}</span>
      )}
    </div>
  );
};
