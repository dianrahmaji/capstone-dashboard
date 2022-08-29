import DocumentItem from "./document/DocumentItem";
import FolderItem from "./folder/FolderItem";

function DocumentContainer() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      <FolderItem />
      <DocumentItem />
    </div>
  );
}

export default DocumentContainer;
