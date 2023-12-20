import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from "../db/auth";
import Cookies from "js-cookie";
import { urlApi } from "../../config/axios";

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
  const [userId, setUserId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [mentorId, setMentorId] = useState(null);

  const [loginActive, setLoginActive] = useState(false);

  const obtenerIdDelMentor = async (userId) => {
    try {
      let url = `/auth/filter/${userId}`;
      const response = await urlApi.get(url);
      console.log("response", response);
      const mentorIds = response.data.mentor[0]?.id;
      const studentIds = response.data.alumn[0]?.id;

      if (mentorIds && studentIds) {
        setMentorId(mentorIds);
        setStudentId(studentIds);
      } else if (mentorIds!= null & studentIds == null) {
        setMentorId(mentorIds);
      } else if (studentIds != null && mentorIds == null) {
        setStudentId(studentIds);
      }
    } catch (error) {
      console.error("Error fetching mentor ID:", error);
    }
  };

  const toggleLoginClass = () => {
    setLoginActive(!loginActive);
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      if (res && res.data) {
        setUser(res.data);
        setUserId(res.data.userId);
        await obtenerIdDelMentor(res.data.userId);
        setIsAuthenticated(true);
        Cookies.set("token", res.data.token, { expires: 7 });
      } else {
        console.error("Respuesta inesperada", res);
      }
    } catch (err) {
      setErrors(err.response.data);
    }
  };
  

  const signOut = () => {
    Cookies.remove("token"); 
    setIsAuthenticated(false);
    setUser(null);
    setUserId(null);
    setMentorId(null);
    setStudentId(null);
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
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(token);
        console.log(res);

        if (!res.data) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
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
        signOut,
        user,
        name,
        isAuthenticated,
        errors,
        isLoading,
        loginActive,
        toggleLoginClass,
        userId,
        mentorId,
        studentId,
        obtenerIdDelMentor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
