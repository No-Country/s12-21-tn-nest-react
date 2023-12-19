import "./style.css";
import { ItemListChat } from "../ItemListChat/ItemListChat";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import SocketContext from "../../../context/SocketContext";
import { EVENTS } from "../../constants";

export const ListChat = ({ list }) => {
  const navigate = useNavigate();
  const { socket, setChat } = useContext(SocketContext);

  const handleClick = (item) => {
    setChat(item);
    navigate("/chat/" + item.id);
    socket.emit(EVENTS.JOIN_CHAT, item.id);
  };

  return (
    <>
      <div className="list__chat">
        {list.map((item) => (
          <ItemListChat
            key={item.id}
            item={item}
            onClick={() => handleClick(item)}
          ></ItemListChat>
        ))}
      </div>
    </>
  );
};
