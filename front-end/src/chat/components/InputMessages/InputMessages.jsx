import "./style.css";

import sendIcon from "../../../images/chat/send-icon.svg";
import { useRef } from "react";

export const InputMessages = ({ emmitMessage }) => {
  const text = useRef(null);

  const handleEmmit = () => {
    const msg = text.current.value;
    emmitMessage(msg);
    text.current.value = "";
  };

  return (
    <div className="input__private">
      <div className="input__wrapper">
        <textarea
          ref={text}
          className="input__msg"
          type="text"
          placeholder="Escribe un mensaje"
        />
        <div className="container__send">
          <button onClick={handleEmmit} className="btn__send">
            <img src={sendIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
