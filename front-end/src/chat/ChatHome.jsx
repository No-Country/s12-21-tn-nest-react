
import { Outlet } from "react-router-dom";
import { ListChat } from "../components/chat/ListChat/ListChat";
import { useRef } from "react";
import { TopPrivateChat } from "../components/chat/TopComponents/TopPrivateChat";
import { TopListChat } from "../components/chat/TopComponents/TopListChat";
import "./style.css";

export const ChatHome = () => {
  const aside = useRef(null);
  //const leave = useRef(null);

  return (
    <>
      <div className="chat__container">
        <aside ref={aside} className="chat__aside">
          <TopListChat />
          <ListChat />
        </aside>
        <div className="chat__private">
          <TopPrivateChat />
          <Outlet />
        </div>
      </div>
    </>
  );
};
