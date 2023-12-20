import { useContext, useEffect } from "react";
import SocketContext from "../../context/SocketContext";
import { EVENTS } from "../constants";
import { useState } from "react";
import AuthContext from "../../context/AuthContext";

export const usePrivateChat = () => {
  const { socket, chat } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  const sendMessage = (message) => {
    socket.emit(EVENTS.SEND_MESSAGE, buildSocketRequest(message));
  };

  const getIds = () => {
    const { mentorId, alumnId, id } = chat;
    return { mentorId, alumnId, id };
  };

  const buildSocketRequest = (message) => {
    const { id, mentorId } = getIds();
    const request = {
      chatId: id,
      message,
      senderId: "",
      receiverId: mentorId,
    };
    return request;
  };

  useEffect(() => {
    socket.on(EVENTS.MESSAGE_SENT, (data) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on(EVENTS.GET_ALL_MESSAGES, (data) => {
      setMessages(data);
    });

    return () => {
      socket.off(EVENTS.MESSAGE_SENT);
      socket.off(EVENTS.GET_ALL_MESSAGES);
    };
  }, []);

  return { socket, messages, sendMessage, userId: user.userId };
};
