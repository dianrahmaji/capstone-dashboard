import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";

import useChat from "~/hooks/useChat";

import AttachmentButton from "./AttachmentButton";
import Attachments from "./Attachments";
import BaseIconButton from "~/components/generic/button/BaseIconButton";

function ChatInput() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { sendMessage } = useChat();

  const handleSubmit = (e) => {
    if ((e.key && !(e.key === "Enter")) || message.length === 0) {
      return;
    }
    sendMessage(message);
    setLoading(true);
    setMessage("");
    setLoading(false);
  };

  return (
    <div className="w-full px-10 pb-10">
      <Attachments />
      <div className="flex items-center justify-end gap-2">
        <div className="mt-1 grow">
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleSubmit}
          />
        </div>
        <AttachmentButton />
        <BaseIconButton secondary loading={loading} onClick={handleSubmit}>
          <PaperAirplaneIcon className="h-6 w-6 rotate-90" aria-hidden="true" />
        </BaseIconButton>
      </div>
    </div>
  );
}

export default ChatInput;
