import { useContext, useEffect } from "react";
import SocketContext from "../../context/SocketContext";
import { EVENTS } from "../constants";
import { useState } from "react";
import AuthContext from "../../context/AuthContext";

export const usePrivateChat = () => {
  const { socket, chat } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([1, 2, 3, 4, 5, 6, 6, 7, 8, 8]);

  const sendMessage = (message) => {
    socket.emit(EVENTS.SEND_MESSAGE, message);
  };

  useEffect(() => {
    socket.on(EVENTS.SEND_MESSAGE, (data) => {
      setMessages((messages) => [...messages, data]);
    });
    return () => {
      socket.off(EVENTS.SEND_MESSAGE);
    };
  }, []);

  return { socket, messages, sendMessage, userId: user.user };
};
