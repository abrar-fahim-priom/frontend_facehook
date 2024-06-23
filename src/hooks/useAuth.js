import { useContext, useDebugValue } from "react";
import { AuthContext } from "../contexts";

export const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) =>
    auth?.user ? "User logged in" : "user Logged out"
  );
  return useContext(AuthContext);
};
