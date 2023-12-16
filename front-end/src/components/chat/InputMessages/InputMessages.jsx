import "./style.css";

import sendIcon from "../../../../public/chat/send-icon.svg";

export const InputMessages = () => {
  return (
    <div className="input__private">
      <div className="input__wrapper">
        <textarea
          className="input__msg"
          type="text"
          placeholder="Escribe un mensaje"
        />
        <div className="container__send">
          <button className="btn__send">
            <img src={sendIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
