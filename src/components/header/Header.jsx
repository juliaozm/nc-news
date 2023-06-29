import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "contexts/loggedinUser";
import { UserItem } from "components/header/UserItem";
import { ButtonLink } from "components/UI/button/ButtonLink";
import { LogoutItem } from "components/header/LogoutItem";

export const Header = () => {
  const location = useLocation();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  if (location.pathname === "/" || location.pathname === "/login") {
    return null;
  }

  return (
    <header className="w-full bg-white shadow-md">
      <nav className="mx-auto flex items-center justify-end p-3 px-4 2xl:container lg:px-8 xl:px-16">
        {!loggedInUser.username ? (
          <Link to="/login">
            <ButtonLink text={"Login"} />
          </Link>
        ) : (
          <div className="flex items-center">
            <UserItem user={loggedInUser} />
            <LogoutItem user={loggedInUser} setLoggedInUser={setLoggedInUser} />
          </div>
        )}
      </nav>
    </header>
  );
};
