import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchChatLog } from "~/store/actions/chatActions";

import ChatBubble from "./ChatBubble";

function ChatContainer() {
  const endMessage = useRef(null);
  const dispatch = useDispatch();

  const {
    data: { roomId, log },
  } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchChatLog(roomId));
  }, [dispatch, roomId]);

  useEffect(() => {
    endMessage.current?.scrollIntoView();
  });

  return (
    <div className="mx-auto h-5/6 w-full overflow-y-scroll px-4 sm:px-6 md:px-14">
      <div className="flex flex-col">
        {log.map((m) => (
          <ChatBubble key={m._id} message={m} />
        ))}
        <div ref={endMessage} />
      </div>
    </div>
  );
}

export default ChatContainer;
