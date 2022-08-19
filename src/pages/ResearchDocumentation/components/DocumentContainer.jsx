import { useState } from "react";
import DocumentItem from "./DocumentItem";
import DocumentModal from "./DocumentModal";

function DocumentContainer() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleRename = (d) => {
    setSelectedDocument(d);
    setOpenDialog(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <DocumentItem type="file" onRename={handleRename} />
        <DocumentItem onRename={handleRename} />
      </div>
      <DocumentModal
        type="folder"
        action="rename"
        open={openDialog}
        setOpen={setOpenDialog}
        initialValues={selectedDocument}
      />
    </>
  );
}

export default DocumentContainer;
