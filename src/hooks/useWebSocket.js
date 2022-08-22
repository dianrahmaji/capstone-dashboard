import { useContext } from "react";
import { WebSocketContext } from "~/contexts/WebSocket";

const useWebSocket = () => {
  const webSocketContext = useContext(WebSocketContext);

  if (webSocketContext === undefined) {
    // TODO: Reconnect to socket
    throw new Error("Web socket context is undefinded");
  }

  return webSocketContext;
};

export default useWebSocket;
