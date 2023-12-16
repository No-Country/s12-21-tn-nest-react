import "./style.css";
import { InputMessages } from "../components/chat/InputMessages/InputMessages";

export const PrivateChat = () => {
  return (
    <>
      <div className="private__chat__container">
        <div className="priv__messages">PrivateChat</div>
        <InputMessages />
      </div>
    </>
  );
};
