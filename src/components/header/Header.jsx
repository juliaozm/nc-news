import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "contexts/loggedinUser";
import { UserItem } from "components/header/UserItem";
import { ButtonLink } from "components/UI/button/ButtonLink";
import { LogoutItem } from "components/header/LogoutItem";
import { LogoItem } from "components/header/LogoItem";

export const Header = () => {
  const location = useLocation();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <header className="w-full bg-white sm:shadow-md">
      <nav className="mx-auto mt-4 flex items-center justify-between px-4 lg:container sm:mt-0 sm:py-4 lg:px-8">
        <LogoItem />
        {location.pathname === "/login" || !loggedInUser.username ? (
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
