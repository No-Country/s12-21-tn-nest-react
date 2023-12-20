import "./style.css";
import { InputMessages } from "../components/InputMessages/InputMessages";
import { usePrivateChat } from "../hooks/usePrivateChat";
import { Message } from "../components/Messages/Message";

export const PrivateChat = () => {
  const { messages, sendMessage, userId } = usePrivateChat();

  const leftOrRight = (msg) => {
    return msg.sender.id === userId ? " left" : " right";
  };

  return (
    <>
      <div className="private__chat__container">
        <div className="priv__messages">
          {messages.map((msg) => (
            <Message
              key={msg.id}
              position={leftOrRight(msg)}
              msg={msg}
            ></Message>
          ))}
        </div>
        <InputMessages emmitMessage={sendMessage} />
      </div>
    </>
  );
};
