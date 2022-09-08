import { useState } from "react";
import { useSelector } from "react-redux";
import {
  DownloadIcon,
  InformationCircleIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import { BaseMenu, BaseMenuItem } from "~/components/generic/menu/BaseMenu";
import DocumentEditModal from "./DocumentEditModal";
import InfoModal from "../InfoModal";

function DocumentCard({ document }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const handleDownload = () => {};
  const handleDelete = () => {};
  const handleOpenEditModal = () => {
    setOpenInfoModal(false);
    setOpenEditModal(true);
  };

  return (
    <>
      <li className="relative rounded-lg border">
        <div className="group aspect-w-10 aspect-h-7 block overflow-hidden rounded-lg bg-gray-100 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
          <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details for {document.name}</span>
          </button>
        </div>
        <div className="mt-2 flex items-start justify-between p-2">
          <div>
            <p className="pointer-events-none block truncate text-sm font-medium text-gray-900">
              {document.name}
            </p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">
              {document.size}
            </p>
          </div>
          <BaseMenu>
            <BaseMenuItem
              icon={DownloadIcon}
              name="Download"
              onClick={handleDownload}
            />
            <BaseMenuItem
              icon={InformationCircleIcon}
              name="Details"
              onClick={() => setOpenInfoModal(true)}
            />
            <BaseMenuItem
              icon={PencilAltIcon}
              name="Edit"
              onClick={() => setOpenEditModal(true)}
            />
            <BaseMenuItem
              icon={TrashIcon}
              name="Delete"
              onClick={handleDelete}
            />
          </BaseMenu>
        </div>
      </li>
      {/* TODO: Move this to DocumentCardList */}
      <InfoModal
        item={document}
        open={openInfoModal}
        setOpen={setOpenInfoModal}
        onOpenEditModal={handleOpenEditModal}
      />
      <DocumentEditModal
        initialValues={document}
        open={openEditModal}
        setOpen={setOpenEditModal}
      />
    </>
  );
}

function DocumentCardList() {
  const { documents } = useSelector((state) => state.folder.data);

  return (
    documents.length > 0 && (
      <div className="px-4 sm:px-6 md:px-8">
        <h2 className="text-sm font-medium text-gray-500">Documents</h2>
        <ul className="mx-auto mt-3 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
          {documents.map((document) => (
            <DocumentCard document={document} key={document._id} />
          ))}
        </ul>
      </div>
    )
  );
}

export default DocumentCardList;
