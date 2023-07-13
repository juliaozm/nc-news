import { Link } from "react-router-dom";

export const LogoItem = () => {
  return (
    <Link to="/articles">
      <p className="mr-3 text-2xl font-bold text-green-700">NC-NEWS </p>
    </Link>
  );
};
