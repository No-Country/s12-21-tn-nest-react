import { useContext } from "react";
import "./style.css";
import { AuthContext } from "./../../../context/AuthContext";

export const Message = ({ msg, position }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className={`message__wrapper${position ? position : ""}`}>
        <div className="message__user">
          {user.userId === msg.sender.id ? "Me" : msg?.sender?.firstName}
        </div>
        <div className="message__text">
          <p>{msg?.message}</p>
        </div>
      </div>
    </>
  );
};
