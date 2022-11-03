import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import prettyBytes from "pretty-bytes";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  addAttachment,
  removeAttachment,
  resetAttachment,
  updateChatLog,
} from "~/store/actions/chatActions";
import { getFileIcon, splitNameAndExtension } from "~/utils/file";

import BaseIconButton from "~/components/generic/button/BaseIconButton";

function AddFileButton() {
  const fileInputRef = useRef(null);

  const {
    data: { _id, fullName },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { files } = e.target;
    if (!files) return;

    const filesArray = Array.from(files).map((file) => ({
      _id: uuidv4(),
      createdAt: new Date(),
      file,
      sender: { _id, fullName },
      type: "attachment",
    }));

    dispatch(addAttachment(Array.from(filesArray)));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li
      className="aspect-w-9 aspect-h-10 relative cursor-pointer gap-3 rounded-md border-2 border-dashed border-gray-400 bg-gray-200 text-gray-600"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center">
        <PlusIcon className="h-8 w-8" />
        <span>Add File</span>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </li>
  );
}

function AttachmentEntry({ attachment, onDelete }) {
  const { extension } = splitNameAndExtension(attachment.name);
  const FileIcon = useMemo(() => getFileIcon(extension), [extension]);

  return (
    <li className="relative rounded-md border-2 border-solid border-gray-400 bg-gray-200">
      <XIcon
        onClick={onDelete}
        className="absolute right-2 top-2 z-50 h-5 w-5 hover:text-red-500"
      />
      <div className="group aspect-w-10 aspect-h-7 block overflow-hidden rounded-lg bg-gray-100 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <div type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {attachment.name}</span>
        </div>
        <FileIcon />
      </div>
      <div className="mt-2 flex items-start justify-between p-2">
        <div className="flex flex-col truncate">
          <p className="pointer-events-none truncate text-sm font-medium text-gray-900">
            {attachment.name}
          </p>
          <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {prettyBytes(attachment.size)}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function Attachments() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const attachments = useSelector((state) => state.attachments);

  // const { sendMessage } = useChat();

  const handleSubmit = (e) => {
    if (e.key && !(e.key === "Enter") && attachments.length > 0) {
      return;
    }

    // sendMessage(message);
    dispatch(updateChatLog(attachments));
    setLoading(true);
    setMessage("");
    setLoading(false);
    dispatch(resetAttachment());
  };

  const handleDelete = (index) => {
    dispatch(removeAttachment(index));
  };

  return (
    attachments.length > 0 && (
      <div className="absolute left-0 bottom-0 z-20 flex w-full flex-col items-center justify-end gap-2 bg-gray-200">
        <ul className="right-0 bottom-20 mx-auto mt-3 grid w-full grid-cols-2 gap-x-4 gap-y-8 p-3 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
          {attachments.map(({ _id, file }, index) => (
            <AttachmentEntry
              key={_id}
              attachment={file}
              onDelete={() => handleDelete(index)}
            />
          ))}
          <AddFileButton />
        </ul>
        <div className="w-full px-10 pb-10">
          <div className="flex items-center justify-end gap-2">
            <div className="mt-1 grow">
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Message (Optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleSubmit}
              />
            </div>

            <BaseIconButton secondary loading={loading} onClick={handleSubmit}>
              <PaperAirplaneIcon
                className="h-6 w-6 rotate-90"
                aria-hidden="true"
              />
            </BaseIconButton>
          </div>
        </div>
      </div>
    )
  );
}
