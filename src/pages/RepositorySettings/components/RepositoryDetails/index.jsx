import { useState } from "react";
import { useSelector } from "react-redux";

import BaseButton from "~/components/generic/button/BaseButton";
import useSelectedTeam from "~/hooks/useSelectedTeam";
import { toYupFormat, toLocaleFormat } from "~/utils/date";
import RepositoryEditModal from "./RepositoryEditModal";

function RepositoryDetails() {
  const [openDialog, setOpenDialog] = useState(false);

  const team = useSelectedTeam();

  const { repository, ...rest } = team;

  const { data } = useSelector((state) => state.user);

  return (
    <>
      <h1 className="mt-3 text-2xl font-semibold text-gray-900">
        {team?.name}
      </h1>
      <div className="my-6 ml-4 flex flex-col space-y-2">
        <div>
          <dt className="text-base font-medium text-gray-500 sm:w-40 sm:shrink-0">
            Topic
          </dt>
          <dd className="mt-1 text-base text-gray-900 sm:col-span-2">
            {team.length > 0 &&
              team.topics.reduce((prev, curr) => `${prev}, ${curr}`)}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500 sm:w-40 sm:shrink-0">
            Date
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
            Description
          </dt>
          {/* TODO: Add this field to db */}
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

        {data?._id === team?.administrator?._id && (
          <BaseButton className="ml-auto" onClick={() => setOpenDialog(true)}>
            Edit
          </BaseButton>
        )}
      </div>
      <RepositoryEditModal
        title="Repository Edit Modal"
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
