import { createContext, useState, useEffect } from "react";
import { getRefreshToken } from "utils/api";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthTokensProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [accessTokenExpiration, setAccessTokenExpiration] = useState(null);

  const refreshAccessToken = async () => {
    try {
      const tokens = await getRefreshToken();
      setAccessToken(tokens.data.accessToken);
    } catch (error) {
      if (error.response.status === 403) {
        console.log("Token expired");
      }
      if (error.response.status === 401) {
        console.log("Not authenticated");
      }
    }
  };

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setAccessTokenExpiration(decodedToken.exp);
    }
  }, [accessToken, accessTokenExpiration]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        accessTokenExpiration,
        setAccessTokenExpiration,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
