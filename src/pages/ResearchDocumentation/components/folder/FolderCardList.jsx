import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  InformationCircleIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import { BaseMenu, BaseMenuItem } from "~/components/generic/menu/BaseMenu";
import FolderEditModal from "./FolderEditModal";
import InfoModal from "../InfoModal";

function FolderCard({ folder }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const handleDelete = () => {};
  const handleOpenEditModal = () => {
    setOpenInfoModal(false);
    setOpenEditModal(true);
  };

  return (
    <>
      <li key={folder.name} className="col-span-1 flex rounded-md shadow-sm">
        <div className="flex flex-1 items-center justify-between rounded-md border-2 border-gray-200 bg-white py-3">
          <div className="flex-1 truncate px-4 py-2 text-base">
            <Link
              to={`/documentation/${folder._id}`}
              className="font-medium text-gray-900 hover:text-gray-600 hover:underline"
            >
              {folder.name}
            </Link>
          </div>

          <div className="shrink-0 pr-2">
            <BaseMenu>
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
        </div>
      </li>

      <FolderEditModal
        type="child"
        open={openEditModal}
        setOpen={setOpenEditModal}
        initialValues={folder}
      />
      <InfoModal
        item={folder}
        open={openInfoModal}
        setOpen={setOpenInfoModal}
        onOpenEditModal={handleOpenEditModal}
      />
    </>
  );
}

export default function FolderCardList() {
  const { folders } = useSelector((state) => state.folder.data);
  return (
    folders?.length > 0 && (
      <div className="mt-3 px-4 sm:px-6 md:px-8">
        <h2 className="text-sm font-medium text-gray-500">Folders</h2>
        <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {folders.map((folder) => (
            <FolderCard folder={folder} key={folder.name} />
          ))}
        </ul>
      </div>
    )
  );
}
