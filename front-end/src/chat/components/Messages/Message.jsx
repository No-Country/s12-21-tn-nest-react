import "./style.css";

export const Message = ({ msg, position }) => {
  return (
    <>
      <div className={`message__wrapper${position ? position : ""}`}>
        <div className="message__user">
          <p>{msg?.user.firstName}</p>
        </div>
        <div className="message__text">
          <p>{msg?.message}</p>
          <p>Hola</p>
        </div>
      </div>
    </>
  );
};
