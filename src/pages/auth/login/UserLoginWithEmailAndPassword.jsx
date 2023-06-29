import jwtDecode from "jwt-decode";
import { useState } from "react";
import { loginUser } from "utils/api";
import { UserLoginForm } from "pages/auth/login/UserLoginForm";
import { toast } from "react-toastify";

export const UserLoginWithEmailAndPassword = ({
  email,
  setUserChecked,
  setLoggedInUser,
  setAccessToken,
  setAccessTokenExpiration,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const tokens = await loginUser(email, password);
      const decodedToken = jwtDecode(tokens.data.accessToken);
      setAccessToken(() => tokens.data.accessToken);
      setAccessTokenExpiration(() => decodedToken.exp);
      setLoggedInUser(() => ({
        username: decodedToken.username,
        email: decodedToken.email,
        avatar_url: decodedToken.avatar_url,
      }));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response.data.message, {
        toastId: "error",
      });
    }
  };
  return (
    <UserLoginForm
      email={email}
      setUserChecked={setUserChecked}
      handleUserLogin={handleUserLogin}
      password={password}
      setPassword={setPassword}
      isLoading={isLoading}
    />
  );
};
