import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilAltIcon, PlusSmIcon, TrashIcon } from "@heroicons/react/outline";

import useSelectedTeam from "~/hooks/useSelectedTeam";
import { deleteTeamMember } from "~/store/actions/teamActions";

import BaseIconButton from "~/components/generic/button/BaseIconButton";
import BaseTable from "~/components/generic/table/BaseTable";
import BaseTableItem from "~/components/generic/table/BaseTableItem";
import MemberAddModal from "./MemberAddModal";
import MemberEditModal from "./MemberEditModal";

const header = ["Nama", "Fakultas", "Kontribusi", "Tipe", "Role"];

function MemberTable() {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const dispatch = useDispatch();

  const { _id: teamId, members, isAdmin } = useSelectedTeam();
  const {
    data: { _id: userId },
    loading,
  } = useSelector((state) => state.user);

  const handleEdit = (m) => {
    const role = m.isAdmin ? "administrator" : "researcher";
    setSelectedMember({ ...m, role });
    setOpenEditDialog(true);
  };

  const handleDelete = (userId) => {
    dispatch(deleteTeamMember({ userId, teamId }));
  };

  const setTeamDetail = () => {};

  return (
    <div>
      <h2 className="mt-3 text-xl font-medium">Anggota Peneliti</h2>
      <BaseTable header={[...header, isAdmin && "Aksi"]} loading={loading}>
        {members &&
          members.map((m) => (
            <tr key={m._id}>
              <BaseTableItem>{m.fullName}</BaseTableItem>
              <BaseTableItem>{m.faculty}</BaseTableItem>
              <BaseTableItem>{m.contributions || 0} Jam</BaseTableItem>
              <BaseTableItem>
                {m.accountType === "student" ? "Mahasiswa" : "Dosen"}
              </BaseTableItem>
              <BaseTableItem>
                {m.isAdmin ? "Group Manager" : "Peneliti"}
              </BaseTableItem>
              {isAdmin && userId !== m._id && (
                <BaseTableItem className="relative flex gap-2">
                  <PencilAltIcon
                    className="h-6 w-6 rounded-md text-gray-400 hover:cursor-pointer hover:text-blue-700"
                    onClick={() => handleEdit(m)}
                  />
                  <TrashIcon
                    className="h-6 w-6 rounded-md text-gray-400 hover:cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(m._id)}
                  />
                </BaseTableItem>
              )}
            </tr>
          ))}
      </BaseTable>
      {isAdmin && (
        <div className="mt-3 flex justify-end px-8">
          <BaseIconButton onClick={() => setOpenAddDialog(true)}>
            <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
          </BaseIconButton>
        </div>
      )}
      <MemberAddModal
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        members={members.map((m) => m?._id)}
        teamId={teamId}
        setTeamDetail={setTeamDetail}
      />
      <MemberEditModal
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        teamId={teamId}
        initialValues={selectedMember}
      />
    </div>
  );
}

export default MemberTable;
