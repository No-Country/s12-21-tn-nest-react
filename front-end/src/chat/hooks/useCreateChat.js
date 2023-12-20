import { useContext, useEffect, useState } from "react";
import SocketContext from "../../context/SocketContext";
import { EVENTS } from "../constants";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useCreateChat = () => {
  const { socket, setChat, chat } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const [localSocket, setSocket] = useState(socket);

  const getCurrentUserId = () => user.userId;
  const navigate = useNavigate();

  useEffect(() => {

    if (!localSocket) return;
    localSocket.on(EVENTS.CHAT_CREATED, (data) => {
      localSocket.emit(EVENTS.JOIN_CHAT, {
        id: data.id,
        alumnId: data.alumnId,
        mentorId: data.mentorId,
      });

      setChat(data);
      navigate(`/chat/${data.id}`);

      localSocket.off(EVENTS.CHAT_CREATED);

    });
  }, []);

  const createChat = (mentorId) => {
    socket.emit(EVENTS.CREATE_CHAT, {
      alumnId: getCurrentUserId(),
      mentorId: mentorId,
    });
  };

  return { createChat };
};
