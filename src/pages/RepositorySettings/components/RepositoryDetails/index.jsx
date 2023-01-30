import { useState } from "react";

import BaseButton from "~/components/generic/button/BaseButton";
import useSelectedTeam from "~/hooks/useSelectedTeam";
import { toYupFormat, toLocaleFormat } from "~/utils/date";
import RepositoryEditModal from "./RepositoryEditModal";

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
              className="prose"
              dangerouslySetInnerHTML={{
                __html: team.description,
              }}
            />
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
        }}
      />
    </>
  );
}

export default RepositoryDetails;
