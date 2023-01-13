import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
  AnnotationIcon,
  DownloadIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import {
  fetchTeams,
  updateTeam,
  deleteTeam,
} from "~/store/actions/teamActions";

import BaseTable from "~/components/generic/table/BaseTable";
import BaseTableItem from "~/components/generic/table/BaseTableItem";
import ProposalEditModal from "./ProposalEditModal";
import ReviewModal from "./ReviewModal";

const header = ["Judul", "Status", "Aksi"];

function ProposalTable() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.user);
  const { data: teams, loading } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchTeams(data?._id));
  }, [dispatch, data]);

  const handleEdit = (p) => {
    const { repository, ...rest } = p;
    repository.startDate = repository.startDate.slice(0, 10);
    repository.endDate = repository.endDate.slice(0, 10);
    setSelectedProposal({ ...repository, ...rest });
    setOpenDialog(true);
  };

  const handleOpenReview = (p) => {
    setSelectedProposal(p);
    setOpenReview(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTeam(id));
  };

  const handleSubmit = (values) => {
    dispatch(updateTeam(values));
    setOpenDialog(false);
  };

  return (
    <>
      <BaseTable header={header} loading={loading} empty={teams.length === 0}>
        {teams &&
          teams.map((p) => (
            <tr key={p._id}>
              <BaseTableItem className="font-medium">{p.name}</BaseTableItem>
              <BaseTableItem>
                <span
                  className={clsx(
                    "inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ",
                    {
                      "bg-blue-100 text-blue-800": p.status === "pending",
                      "bg-yellow-100 text-yellow-800": p.status === "updated",
                      "bg-green-100 text-green-800": p.status === "accepted",
                      "bg-red-100 text-red-800": p.status === "rejected",
                    },
                  )}
                >
                  {p.status}
                </span>
              </BaseTableItem>
              <BaseTableItem className="relative flex gap-2">
                {p.status === "rejected" && (
                  <AnnotationIcon
                    className="h-6 w-6 rounded-md text-gray-400 hover:cursor-pointer hover:text-blue-700"
                    onClick={() => handleOpenReview(p)}
                  />
                )}
                <PencilAltIcon
                  className="h-6 w-6 rounded-md text-gray-400 hover:cursor-pointer hover:text-blue-700"
                  onClick={() => handleEdit(p)}
                />
                <DownloadIcon
                  className="h-6 w-6 rounded-md text-gray-400 hover:cursor-pointer hover:text-green-700"
                  onClick={() => window.open(p.document)}
                />
                <TrashIcon
                  className="h-6 w-6 rounded-md text-gray-400 hover:cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(p._id)}
                />
              </BaseTableItem>
            </tr>
          ))}
      </BaseTable>
      <ProposalEditModal
        open={openDialog}
        setOpen={setOpenDialog}
        initialValues={selectedProposal}
        handleSubmit={handleSubmit}
      />

      <ReviewModal
        open={openReview}
        setOpen={setOpenReview}
        selectedProposal={selectedProposal}
      />
    </>
  );
}

export default ProposalTable;
