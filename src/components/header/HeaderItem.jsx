import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "contexts/loggedinUser";
import { UserAvatar } from "components/header/UserAvatar";
import { ButtonPrimary } from "components/UI/ButtonPrimary";

export const HeaderItem = () => {
  const location = useLocation();
  const { loggedInUser } = useContext(UserContext);

  if (location.pathname === "/" || location.pathname === "/login") {
    return null;
  }

  return (
    <header className="w-full bg-white shadow-md">
      <nav className="mx-auto flex items-center justify-end p-3 px-4 2xl:container lg:px-8 xl:px-16">
        {!loggedInUser.username ? (
          <Link to="/login">
            <ButtonPrimary text={"Login"} />
          </Link>
        ) : (
          <UserAvatar user={loggedInUser} />
        )}
      </nav>
    </header>
  );
};
