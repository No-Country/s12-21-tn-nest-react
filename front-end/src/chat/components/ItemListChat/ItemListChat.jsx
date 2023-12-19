import { useContext } from "react";
import "./style.css";
import AuthContext from "../../../context/AuthContext";

export const ItemListChat = ({ onClick, item }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div onClick={onClick} className="item__list">
        <div className="item__list-img">
          <img src="" alt="" />
        </div>
        <div className="item__list-name">
          <p>
            {user.userId == item.mentor.id
              ? item?.alumn?.firstName + " " + item?.alumn?.lastName
              : item?.mentor?.firstName + " " + item?.mentor?.lastName}
          </p>
        </div>
      </div>
    </>
  );
};
