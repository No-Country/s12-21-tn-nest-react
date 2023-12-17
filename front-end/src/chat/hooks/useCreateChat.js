import { useContext, useEffect, useState } from "react";
import SocketContext from "../../context/SocketContext";
import { EVENTS } from "../constants";
import AuthContext from "../../context/AuthContext";

export const useCreateChat = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const [localSocket, setSocket] = useState(socket);

  const getCurrentUserId = () => user.userId;

  useEffect(() => {
    localSocket.on(EVENTS.CHAT_CREATED, (data) => {
      console.log("Chat created", data);
      localSocket.emit(EVENTS.JOIN_CHAT, {
        id: data.chatId,
        alumnId: data.alumnId,
        mentorId: data.mentorId,
      });
      localSocket.off(EVENTS.CHAT_CREATED);
    });

    return () => {
      setSocket(null);
    };
  }, []);

  const createChat = (mentorId) => {
    socket.emit(EVENTS.CREATE_CHAT, {
      alumnId: getCurrentUserId(),
      mentorId: mentorId,
    });
  };

  return { createChat };
};
