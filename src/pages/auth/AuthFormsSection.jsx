import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "contexts/authTokenContext";
import { UserContext } from "contexts/loggedinUser";
import { UserCheckForm } from "pages/auth/check/UserCheckForm";
import { UserCreateWithEmailAndPassword } from "pages/auth/register/UserCreateWithEmailAndPassword";
import { UserLoginWithEmailAndPassword } from "pages/auth/login/UserLoginWithEmailAndPassword";
import { GoogleAuthProvider } from "firebaseConfig/GoogleAuthProvider";

export const AuthFormsSection = () => {
  const [email, setEmail] = useState("");
  const [userChecked, setUserChecked] = useState("none");
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { setAccessToken, setAccessTokenExpiration } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser.email) {
      navigate("/articles");
    }
  }, [loggedInUser]);

  return (
    <div className="mx-auto p-4 md:w-3/4 md:px-6 md:py-10 xl:w-2/3">
      {userChecked === "none" && (
        <UserCheckForm
          setEmail={setEmail}
          setUserChecked={setUserChecked}
          email={email}
        />
      )}
      {userChecked === "login" && (
        <UserLoginWithEmailAndPassword
          email={email}
          setUserChecked={setUserChecked}
          setLoggedInUser={setLoggedInUser}
          setAccessToken={setAccessToken}
          setAccessTokenExpiration={setAccessTokenExpiration}
        />
      )}
      {userChecked === "create" && (
        <UserCreateWithEmailAndPassword
          email={email}
          setUserChecked={setUserChecked}
          setLoggedInUser={setLoggedInUser}
          setAccessToken={setAccessToken}
          setAccessTokenExpiration={setAccessTokenExpiration}
        />
      )}
      <GoogleAuthProvider />
    </div>
  );
};
