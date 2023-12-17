import { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SocketConext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(BASE_URL, {
      auth: {
        token: user?.token,
      },
    });
    setSocket(socket);
  }, []);

  return (
    <SocketConext.Provider value={{ socket }}>{children}</SocketConext.Provider>
  );
};

export default SocketConext;
