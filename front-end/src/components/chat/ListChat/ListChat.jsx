import "./style.css";
import { ItemListChat } from "../ItemListChat/ItemListChat";

export const ListChat = () => {
  const list = [1, 2, 3, 4, 5, 10, 12, 34, 56, 67, 44, 66, 77];

  return (
    <>
      <div className="list__chat">
        {list.map((item) => (
          <ItemListChat key={item}></ItemListChat>
        ))}
      </div>
    </>
  );
};
