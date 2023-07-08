import { useContext } from "react";
import jwtDecode from "jwt-decode";

import authStorage from "./storage";
import AuthContext from "./context";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    try {
      const decodedUser = jwtDecode(authToken);
      setUser(decodedUser);
      authStorage.storeToken(authToken);
      // Use the decoded user data as needed
    } catch (error) {
      console.log("Error decoding token:", error);
    }
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { logOut, logIn, user, setUser };
};

export default useAuth;
