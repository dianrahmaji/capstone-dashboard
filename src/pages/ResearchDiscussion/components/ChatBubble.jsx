import { DownloadIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage, timestamp } from "~/config/firebase";
import { toTimeOnlyFormat } from "~/utils/date";
import { getFileIcon, splitNameAndExtension } from "~/utils/file";
import useSelectedTeam from "~/hooks/useSelectedTeam";
import { updateAttachmentStatus } from "~/store/actions/chatActions";
import useChat from "~/hooks/useChat";

function LoadingIcon() {
  return (
    <svg
      className="mr-3 h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function Attachment({ attachment }) {
  const { _id, file, status, body } = attachment;
  const { extension, name } = splitNameAndExtension(file?.name ?? body);
  const FileIcon = useMemo(() => getFileIcon(extension), [extension]);

  const dispatch = useDispatch();
  const { sendMessage } = useChat();

  const storageDirRef = useRef("");

  const {
    repository: { _id: repositoryId },
  } = useSelectedTeam();

  useEffect(() => {
    // TODO: extract this somewhere e. useUploadFile
    const uploadFile = () => {
      storageDirRef.current = `/${repositoryId}/attachments/${timestamp
        .now()
        .toMillis()}_${file.name}`;

      const storageRef = ref(storage, storageDirRef.current);

      const upload = uploadBytesResumable(storageRef, file);

      upload.on(
        "state_changed",
        () => {},
        // eslint-disable-next-line no-console
        (err) => console.log(err),
        () =>
          getDownloadURL(upload.snapshot.ref).then((url) => {
            dispatch(
              updateAttachmentStatus({
                _id,
                body: file.name,
                url,
                status: "uploaded",
              }),
            );
            sendMessage(file.name, "attachment", url);
          }),
      );
    };

    if (status === "uploading") uploadFile();
  }, [_id, dispatch, file, repositoryId, sendMessage, status]);

  function handleDownload(url) {
    window.open(url);
  }

  return (
    <div className="col-span-1 flex items-center rounded-md border-2 border-gray-200 shadow-sm">
      <div className="flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium">
        <FileIcon className="h-8 w-8" />
      </div>
      <div className="mr-3 flex flex-1 items-center justify-between truncate rounded-md py-3">
        <div className="max-w-[50%] flex-1 py-2 pr-10 text-base">
          <span className="truncate">{name}</span>.{extension}
        </div>
      </div>
      <div className="shrink-0 pr-2">
        {status === "uploading" ? (
          <LoadingIcon />
        ) : (
          <DownloadIcon
            onClick={() => handleDownload(attachment.url)}
            className="mr-3 h-5 w-5 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

function ChatBubble({ message }) {
  const {
    data: { _id: userId },
  } = useSelector((data) => data.user);

  return (
    <div
      className={clsx("flex", {
        "justify-end": message.sender._id === userId,
      })}
    >
      <div className="w-fit max-w-xl text-black">
        {message.sender._id !== userId && (
          <p className="text-sm">{message.sender.fullName}</p>
        )}
        {message.type === "text" ? (
          <p
            className={clsx(" mb-3 rounded-xl p-4", {
              "bg-gray-200": message.sender._id !== userId,
              "bg-primary text-white": message.sender._id === userId,
            })}
          >
            {message.body}
          </p>
        ) : (
          <Attachment attachment={message} />
        )}
        <time
          dateTime={message.createdAt}
          className="mb-2 flex justify-end text-xs italic"
        >
          {toTimeOnlyFormat(message.createdAt)}
        </time>
      </div>
    </div>
  );
}

export default ChatBubble;
