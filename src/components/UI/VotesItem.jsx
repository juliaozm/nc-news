import { useContext, useEffect, useState } from "react";
import { UserContext } from "contexts/loggedinUser";
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io";

export const VotesItem = ({ item, setUpdatedVotes }) => {
  const { loggedInUser } = useContext(UserContext);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [activeBtn, setActiveBtn] = useState(null);

  useEffect(() => {
    Object.keys(loggedInUser).length > 0 && !loggedInUser.firebase
      ? setDisabledBtn(false)
      : setDisabledBtn(true);
  }, [loggedInUser]);

  useEffect(() => {
    if (activeBtn === "") {
      item.votes++;
      setUpdatedVotes((values) => ({ ...values, inc_votes: +1 }));
    } else if (activeBtn === "like") {
      item.votes++;
      setUpdatedVotes((values) => ({ ...values, inc_votes: +1 }));
    } else if (activeBtn === "none") {
      item.votes--;
      setUpdatedVotes((values) => ({ ...values, inc_votes: -1 }));
    } else if (activeBtn === "dislike") {
      item.votes--;
      setUpdatedVotes((values) => ({ ...values, inc_votes: -1 }));
    }
  }, [activeBtn]);

  return (
    <div className="flex items-center">
      <button
        className={
          disabledBtn
            ? "flex cursor-not-allowed items-center text-gray-500"
            : "flex items-center font-semibold text-gray-600"
        }
        disabled={disabledBtn}
      >
        {!activeBtn || activeBtn === "none" ? (
          <>
            <IoMdThumbsUp
              onClick={() => setActiveBtn("like")}
              className={disabledBtn ? "pointer-events-none" : ""}
            />
            <span className="ml-2 mr-2">{item.votes}</span>
            <IoMdThumbsDown
              onClick={() => setActiveBtn("dislike")}
              className={disabledBtn ? "pointer-events-none" : ""}
            />
          </>
        ) : (
          ""
        )}
        {activeBtn === "like" ? (
          <>
            <IoMdThumbsUp
              className={disabledBtn ? "pointer-events-none" : "fill-green-700"}
              onClick={() => setActiveBtn("none")}
            />
            <span className="ml-2 text-green-700">{item.votes}</span>
          </>
        ) : (
          ""
        )}
        {activeBtn === "dislike" ? (
          <>
            <IoMdThumbsDown
              className={disabledBtn ? "pointer-events-none" : "fill-red-600"}
              onClick={() => setActiveBtn("")}
            />
            <span className="ml-2 text-red-600">{item.votes}</span>
          </>
        ) : (
          ""
        )}
      </button>
    </div>
  );
};
