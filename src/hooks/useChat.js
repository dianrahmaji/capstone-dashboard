import { useContext } from "react";
import { ChatContext } from "~/contexts/Chat";

const useChat = () => {
  const chatContext = useContext(ChatContext);

  if (ChatContext === undefined) {
    // TODO: Reconnect to socket
    throw new Error("Web socket context is undefinded");
  }

  return chatContext;
};

export default useChat;
