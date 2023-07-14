import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "contexts/loggedinUser";
import { UserCheckForm } from "pages/auth/check/UserCheckForm";
import { UserCreateWithEmailAndPassword } from "pages/auth/register/UserCreateWithEmailAndPassword";
import { UserLoginWithEmailAndPassword } from "pages/auth/login/UserLoginWithEmailAndPassword";
import { GoogleAuthProvider } from "firebaseConfig/GoogleAuthProvider";

export const AuthFormsSection = () => {
  const [email, setEmail] = useState("");
  const [userChecked, setUserChecked] = useState("none");
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    renderForm();
  }, [userChecked]);

  useEffect(() => {
    if (loggedInUser.email) {
      navigate("/articles");
    }
  }, [loggedInUser]);

  const renderForm = () => {
    switch (userChecked) {
      case "none":
        return (
          <UserCheckForm
            setEmail={setEmail}
            setUserChecked={setUserChecked}
            email={email}
          />
        );
      case "login":
        return (
          <UserLoginWithEmailAndPassword
            email={email}
            setUserChecked={setUserChecked}
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
        );
      case "create":
        return (
          <UserCreateWithEmailAndPassword
            email={email}
            setUserChecked={setUserChecked}
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
          />
        );
    }
  };

  return (
    <div className="mx-auto p-4 sm:w-3/4 lg:w-1/2">
      {renderForm()}
      <GoogleAuthProvider />
    </div>
  );
};
