import "./style.css";
import close from "../../../images/chat/close.svg";
import chats from "../../../images/chat/chats.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import SocketContext from "../../../context/SocketContext";
import AuthContext from "../../../context/AuthContext";

export const TopPrivateChat = () => {
  const navigate = useNavigate();
  const { chat } = useContext(SocketContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="top__private">
        <div className="private__img-container">
          <img src={chats} alt="" />
        </div>
        <div className="chat__with">
          <img src="" alt="" />
          <p>
            {user.userId == chat?.mentor.id
              ? chat?.alumn?.firstName
                ? chat?.alumn?.firstName
                : ""
              : chat?.mentor?.firstName
              ? chat?.mentor?.firstName
              : ""}
          </p>
        </div>
        <div className="private__img-container">
          <img onClick={() => navigate("/")} src={close} alt="" />
        </div>
      </div>
    </>
  );
};
