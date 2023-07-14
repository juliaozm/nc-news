import { createContext, useState, useEffect } from "react";
import { getRefreshToken } from "utils/api";

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
