import jwtDecode from "jwt-decode";
import { useState } from "react";
import { postNewUser } from "utils/api";
import { UserCreateForm } from "pages/auth/register/UserCreateForm";
import { toast } from "react-toastify";

export const UserCreateWithEmailAndPassword = ({
  email,
  setUserChecked,
  setLoggedInUser,
  setAccessToken,
  setAccessTokenExpiration,
}) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserCreate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    postNewUser({ email, username, password })
      .then((tokens) => {
        // Signed in
        const decodedToken = jwtDecode(tokens.data.accessToken);
        setAccessToken(() => tokens.data.accessToken);
        setAccessTokenExpiration(() => decodedToken.exp);
        setLoggedInUser(() => ({
          username: decodedToken.username,
          email: decodedToken.email,
          avatar_url: decodedToken.avatar_url,
        }));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data.message, {
          toastId: "error",
        });
        if (error.response.status === 409) {
          setUserChecked("login");
        }
      });
  };

  return (
    <UserCreateForm
      email={email}
      username={username}
      setUsername={setUsername}
      setUserChecked={setUserChecked}
      password={password}
      setPassword={setPassword}
      handleUserCreate={handleUserCreate}
      isLoading={isLoading}
    />
  );
};
