import { Link } from "react-router-dom";

export const LogoItem = () => {
  return (
    <Link to="/articles">
      <p className="mr-3 text-lg font-bold text-green-700 md:text-2xl">
        NC-NEWS
      </p>
    </Link>
  );
};
