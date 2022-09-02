import { useState } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

import { BaseMenu, BaseMenuItem } from "~/components/generic/menu/BaseMenu";
import FolderInfoModal from "./FolderInfoModal";

const folders = [
  {
    name: "Graph API",
    initials: "GA",
    href: "#",
    members: 16,
    bgColor: "bg-pink-600",
  },
  {
    name: "Component Design",
    initials: "CD",
    href: "#",
    members: 12,
    bgColor: "bg-purple-600",
  },
  {
    name: "Templates",
    initials: "T",
    href: "#",
    members: 16,
    bgColor: "bg-yellow-500",
  },
  {
    name: "React Components",
    initials: "RC",
    href: "#",
    members: 8,
    bgColor: "bg-green-500",
  },
];

function FolderCard({ folder }) {
  const [openEditFolderDialog, setOpenFolderDialog] = useState(false);
  const handleDelete = () => {};

  return (
    <>
      <li key={folder.name} className="col-span-1 flex rounded-md shadow-sm">
        <div className="flex flex-1 items-center justify-between rounded-md border-2 border-gray-200 bg-white py-3">
          <div className="flex-1 truncate px-4 py-2 text-base">
            <a
              href={folder.href}
              className="font-medium text-gray-900 hover:text-gray-600"
            >
              {folder.name}
            </a>
          </div>

          <div className="shrink-0 pr-2">
            <BaseMenu>
              <BaseMenuItem
                icon={PencilAltIcon}
                name="Edit"
                onClick={() => setOpenFolderDialog(true)}
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
      <FolderInfoModal
        open={openEditFolderDialog}
        setOpen={setOpenFolderDialog}
      />
    </>
  );
}

export default function FolderCardList() {
  return (
    <div className="mt-3 px-4 sm:px-6 md:px-8">
      <h2 className="text-sm font-medium text-gray-500">Folders</h2>
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {folders.map((folder) => (
          <FolderCard folder={folder} key={folder.name} />
        ))}
      </ul>
    </div>
  );
}
