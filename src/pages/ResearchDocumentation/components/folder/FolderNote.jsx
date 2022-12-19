/* eslint-disable react/no-danger */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilAltIcon } from "@heroicons/react/solid";

import { updateFolderNote } from "~/store/actions/folderActions";

import ReactQuill from "~/components/ReactQuill";
import BaseButton from "~/components/generic/button/BaseButton";

export default function FolderNote() {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const { _id: folderId, note } = useSelector((state) => state.folder.data);
  const { _id: authorId } = useSelector((state) => state.user.data);

  useEffect(() => {
    setContent(note);
  }, [note]);

  const handleSubmit = () => {
    dispatch(updateFolderNote({ folderId, content, authorId }));
    setIsEditing(false);
  };

  return (
    <div className="my-20">
      {isEditing ? (
        <>
          <ReactQuill value={content} setValue={setContent} />
          <div className="mt-3 flex justify-end px-8">
            <BaseButton
              className="mt-3 flex items-center gap-3"
              onClick={handleSubmit}
            >
              <PencilAltIcon className="h-5 w-5" />
              Simpan Catatan
            </BaseButton>
          </div>
        </>
      ) : (
        <div className="relative mx-auto max-w-7xl p-6">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="mt-3 flex justify-end px-8">
            <BaseButton
              className="mt-3 flex items-center gap-3"
              onClick={() => setIsEditing(true)}
            >
              <PencilAltIcon className="h-5 w-5" />
              Edit Catatan
            </BaseButton>
          </div>
        </div>
      )}
    </div>
  );
}
