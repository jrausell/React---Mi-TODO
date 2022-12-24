import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import loginUserRequest from "../api/loginUserRequest";
import signUpUserRequest from "../api/signUpUserRequest";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();

  const singUp = (data, redirect = false, signUpMethod) => {
    const user_credential = signUpUserRequest(data, signUpMethod);
    console.log(user_credential);
    return user_credential
    if(!user_credential){
      return {error: "Can't login?", user_credential}
    }
    setUser(user_credential);
    if(redirect === true) navigate("/in/todo", { replace: true });
  };

  const login = (credentials, redirect = false, loginMethod) => {
    const user_credential = loginUserRequest(credentials.email, credentials, loginMethod);
    console.log(user_credential);
    return user_credential
    if(!user_credential){
      return {error: "Can't login?", user_credential}
    }
    setUser(user_credential);
    if(redirect === true) navigate("/in/todo", { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
