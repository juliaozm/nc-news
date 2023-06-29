import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "contexts/authTokenContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const { refreshAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (loggedInUser.email && !loggedInUser.firebase) {
      refreshAccessToken();
      const tokenCheckInterval = setInterval(refreshAccessToken, 14900);
      return () => clearInterval(tokenCheckInterval);
    }
  }, [loggedInUser]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {" "}
      {children}
    </UserContext.Provider>
  );
};
