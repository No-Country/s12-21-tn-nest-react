import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./style.css";

export const TopListChat = () => {
  const { name } = useContext(AuthContext);

  return (
    <>
      <div className="top__list">
        <div className="top__list-img">
          <img src="" alt="" />
        </div>
        <div>
          <p>{name}</p>
        </div>
      </div>
    </>
  );
};
