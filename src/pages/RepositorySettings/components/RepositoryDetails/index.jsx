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
      <div className="my-6 ml-4 flex flex-col">
        <div className="text-lg font-medium">Topic</div>
        {/* TODO: Add this field to db */}
        <div>Information System, Web Development, Knowledge Management</div>
        <div className="mt-5 text-lg  font-medium">Time</div>
        <div>
          <time dateTime={team?.repository?.startDate}>
            {toLocaleFormat(team?.repository?.startDate)}
          </time>{" "}
          -{" "}
          <time dateTime={team?.repository?.endDate}>
            {toLocaleFormat(team?.repository?.endDate)}
          </time>
        </div>
        <div className="mt-5 text-lg  font-medium">Description</div>
        <div
          dangerouslySetInnerHTML={{ __html: team?.repository?.description }}
        />
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
