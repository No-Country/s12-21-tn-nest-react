import { Outlet } from "react-router-dom";
import { ListChat } from "../components/ListChat/ListChat";
import "./style.css";
import { useEffect, useRef, useState, useContext } from "react";
import { TopPrivateChat } from "../components/TopComponents/TopPrivateChat";
import { TopListChat } from "../components/TopComponents/TopListChat";
import { getMyChats } from "../services";
import { AuthContext } from "../../context/AuthContext";

export const ChatHome = () => {
  const aside = useRef(null);
  const [chats, setChats] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getMyChats(user.userId).then((data) => {
      setChats(data);
    });
  }, []);

  return (
    <>
      <div className="chat__container">
        <aside ref={aside} className="chat__aside">
          <TopListChat />
          <ListChat list={chats} />
        </aside>
        <div className="chat__private">
          <TopPrivateChat />
          <Outlet />
        </div>
      </div>
    </>
  );
};
