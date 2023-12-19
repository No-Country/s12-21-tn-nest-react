import { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SocketConext = createContext();

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    if (isAuthenticated && !socket) {
      const socket = io(BASE_URL, {
        auth: {
          token: user?.token,
        },
      });
      setSocket(socket);
    }
  }, []);

  return (
    <SocketConext.Provider value={{ socket, setChat, chat }}>
      {children}
    </SocketConext.Provider>
  );
};

export default SocketConext;
