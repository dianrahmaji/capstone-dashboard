import { useState } from "react";
import { useSelector } from "react-redux";

import BaseButton from "~/components/generic/button/BaseButton";
import { toYupFormat, toLocaleFormat } from "~/utils/date";
import RepositoryEditModal from "./RepositoryEditModal";

function RepositoryDetails() {
  const [openDialog, setOpenDialog] = useState(false);

  const detail = useSelector(({ selectedTeamId, acceptedTeams }) =>
    acceptedTeams.data.find(({ _id }) => _id === selectedTeamId),
  );

  const { repository, ...rest } = detail;

  const { data } = useSelector((state) => state.user);

  return (
    <>
      <h1 className="mt-3 text-2xl font-semibold text-gray-900">
        {detail?.name}
      </h1>
      <div className="my-6 ml-4 flex flex-col">
        <div className="text-lg font-medium">Topic</div>
        {/* TODO: Add this field to db */}
        <div>Information System, Web Development, Knowledge Management</div>
        <div className="mt-5 text-lg  font-medium">Time</div>
        <div>
          <time dateTime={detail?.repository?.startDate}>
            {toLocaleFormat(detail?.repository?.startDate)}
          </time>{" "}
          -{" "}
          <time dateTime={detail?.repository?.endDate}>
            {toLocaleFormat(detail?.repository?.endDate)}
          </time>
        </div>
        <div className="mt-5 text-lg  font-medium">Description</div>
        <div
          dangerouslySetInnerHTML={{ __html: detail?.repository?.description }}
        />
        {data?._id === detail?.administrator?._id && (
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
