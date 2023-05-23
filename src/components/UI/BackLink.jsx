import { Link } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";

export const BackLink = () => {
  return (
    <Link
      to="/articles"
      className="text-md group mb-5 mt-5 flex items-center font-mono hover:text-green-700 hover:transition-all "
    >
      <HiArrowLongLeft className="mr-2" />
      <span className="font-medium ">Back to articles</span>
    </Link>
  );
};
