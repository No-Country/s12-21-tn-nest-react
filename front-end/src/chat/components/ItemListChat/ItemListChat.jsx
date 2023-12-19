import "./style.css";

export const ItemListChat = ({ onClick, item }) => {
  return (
    <>
      <div onClick={onClick} className="item__list">
        <div className="item__list-img">
          <img src="" alt="" />
        </div>
        <div className="item__list-name">
          <p>{item?.mentor?.firstName + " " + item?.mentor?.lastName}</p>
        </div>
      </div>
    </>
  );
};
