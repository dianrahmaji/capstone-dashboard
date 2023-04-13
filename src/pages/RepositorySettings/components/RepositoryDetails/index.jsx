import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { DownloadIcon } from "@heroicons/react/solid";
import { FilePdf } from "phosphor-react";

import { toYupFormat, toLocaleFormat } from "~/utils/date";
import useSelectedTeam from "~/hooks/useSelectedTeam";

import BaseButton from "~/components/generic/button/BaseButton";
import { BaseMenu, BaseMenuItem } from "~/components/generic/menu/BaseMenu";
import RepositoryEditModal from "./RepositoryEditModal";

const references = [
  {
    id: 1,
    name: "Dokumen C-251.pdf",
    size: "5MB",
  },
  {
    id: 1,
    name: "Dokumen C-501.pdf",
    size: "10MB",
  },
];

function RepositoryDetails() {
  const [openDialog, setOpenDialog] = useState(false);

  const team = useSelectedTeam();

  const { repository, isAdmin, ...rest } = team;

  return (
    <>
      <h1 className="mt-3 text-2xl font-semibold text-gray-900">
        {team?.name}
      </h1>
      <div className="my-6 ml-4 flex flex-col space-y-2">
        <div>
          <dt className="text-base font-medium text-gray-500 sm:w-40 sm:shrink-0">
            Topik
          </dt>
          <dd className="mt-1 text-base text-gray-900 sm:col-span-2">
            {team.topics.length > 0 &&
              team.topics.reduce((prev, curr) => `${prev}, ${curr}`)}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500 sm:w-40 sm:shrink-0">
            Tanggal
          </dt>
          <dd className="mt-1 text-base text-gray-900 sm:col-span-2">
            <time dateTime={repository?.startDate}>
              {toLocaleFormat(repository?.startDate)}
            </time>{" "}
            -{" "}
            <time dateTime={repository?.endDate}>
              {toLocaleFormat(repository?.startDate)}
            </time>
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500 sm:w-40 sm:shrink-0">
            Deskripsi
          </dt>
          <dd className="mt-1 text-base text-gray-900 sm:col-span-2">
            {/* eslint-disable react/no-danger */}
            <div
              className="ql-editor  p-0"
              dangerouslySetInnerHTML={{
                __html: team.description,
              }}
            />
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500 sm:w-40 sm:shrink-0">
            Referensi
          </dt>
          <dd className="mt-1 text-base text-gray-900 sm:col-span-2">
            <ul className="mx-auto mt-3 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
              {references.map((reference) => (
                <li key={reference.id} className="relative rounded-lg border">
                  <div className="group  aspect-w-10 aspect-h-7 flex items-center overflow-hidden rounded-lg bg-gray-100 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                    <FilePdf className="h-full w-full" />
                  </div>
                  <div className="mt-2 flex items-start justify-between p-2">
                    <div className="flex flex-col truncate">
                      <p className="pointer-events-none text-sm font-medium text-gray-900">
                        {reference.name}
                      </p>
                      <p className="pointer-events-none block text-sm font-medium text-gray-500">
                        {reference.size}
                      </p>
                    </div>
                    <BaseMenu>
                      <BaseMenuItem
                        icon={DownloadIcon}
                        name="Unduh"
                        onClick={() => {}}
                      />
                    </BaseMenu>
                  </div>
                </li>
              ))}
            </ul>
          </dd>
        </div>

        {isAdmin && (
          <BaseButton className="ml-auto" onClick={() => setOpenDialog(true)}>
            Edit
          </BaseButton>
        )}
      </div>
      <RepositoryEditModal
        title="Edit Informasi Proyek Penelitian"
        open={openDialog}
        setOpen={setOpenDialog}
        initialValues={{
          ...repository,
          startDate: toYupFormat(repository?.startDate),
          endDate: toYupFormat(repository?.endDate),
          ...rest,
          references: [],
        }}
      />
    </>
  );
}

export default RepositoryDetails;
