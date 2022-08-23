/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import { updateChatLog } from "~/store/actions/chatActions";

export const ChatContext = createContext(undefined);

export default function ChatProvider({ children }) {
  const socketRef = useRef(undefined);
  const dispatch = useDispatch();
  const {
    data: { roomId },
  } = useSelector((state) => state.chat);
  const {
    data: { _id, fullName },
  } = useSelector((state) => state.user);

  const sendMessage = (message) => {
    socketRef.current.emit("send_message", roomId, {
      sender: _id,
      text: message,
    });

    dispatch(
      updateChatLog({
        _id: Math.floor(Math.random * 1_000_000),
        text: message,
        createdAt: new Date(),
        sender: { _id, fullName },
      }),
    );
  };

  useEffect(() => {
    if (!socketRef.current && _id) {
      socketRef.current = io(import.meta.env.VITE_BASE_URL);
    }

    return () => socketRef.current?.disconnect();
  }, [_id]);

  useEffect(() => {
    if (_id) {
      socketRef.current.emit("join_room", roomId);

      socketRef.current.on("receive_message", (message) => {
        dispatch(updateChatLog(message));
      });
    }
  }, [dispatch, roomId, _id]);

  const value = {
    socket: socketRef.current,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
