import { useState } from "react";
import { DocumentAddIcon, FolderAddIcon } from "@heroicons/react/outline";

import DocumentModal from "./document/DocumentModal";
import FolderModal from "./folder/FolderModal";

function ActionContainer() {
  const [openDocumentDialog, setOpenDocumentDialog] = useState(false);
  const [openFolderDialog, setOpenFolderDialog] = useState(false);

  const handleCreate = (type) => {
    if (type === "folder") {
      setOpenFolderDialog(true);
    } else {
      setOpenDocumentDialog(true);
    }
  };

  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pt-3 pb-4 sm:px-6 md:px-8">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-md py-2 px-3 hover:bg-slate-200"
          onClick={() => handleCreate("folder")}
        >
          <FolderAddIcon className="h-6 w-6" /> New Folder
        </button>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-md py-2 px-3 hover:bg-slate-200"
          onClick={() => handleCreate("file")}
        >
          <DocumentAddIcon className="h-6 w-6" /> New Document
        </button>
      </div>
      <FolderModal
        title="Add Folder"
        open={openFolderDialog}
        setOpen={setOpenFolderDialog}
        initialValues={{ title: "", note: "" }}
      />
      <DocumentModal
        title="Add Document"
        open={openDocumentDialog}
        setOpen={setOpenDocumentDialog}
        initialValues={{ title: "", note: "", files: [] }}
      />
    </>
  );
}

export default ActionContainer;
