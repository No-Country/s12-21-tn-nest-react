import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from "../db/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState(null);

  const [loginActive, setLoginActive] = useState(false);

  const toggleLoginClass = () => {
    setLoginActive(!loginActive);
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      if (res && res.data) {
        setIsAuthenticated(true);
        setUser(res.data);
      } else {
        console.error("Respuesta inesperada", res);
      }
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);

        if (!res.data) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setName(res.data.name);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        name,
        isAuthenticated,
        errors,
        isLoading,
        loginActive,
        toggleLoginClass,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
