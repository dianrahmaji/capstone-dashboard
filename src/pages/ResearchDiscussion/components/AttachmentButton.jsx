import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaperClipIcon } from "@heroicons/react/outline";
import { v4 as uuidv4 } from "uuid";

import { addAttachment } from "~/store/actions/chatActions";

import BaseIconButton from "~/components/generic/button/BaseIconButton";

export default function AttachmentButton() {
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
      status: "uploading",
    }));

    dispatch(addAttachment(Array.from(filesArray)));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <BaseIconButton secondary onClick={handleClick}>
      <PaperClipIcon className="h-6 w-6" aria-hidden="true" />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </BaseIconButton>
  );
}
