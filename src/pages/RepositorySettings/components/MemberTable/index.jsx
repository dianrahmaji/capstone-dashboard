import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PencilAltIcon, PlusSmIcon, TrashIcon } from '@heroicons/react/outline'

import { deleteTeamMember } from '~/store/actions/teamActions'

import BaseIconButton from '~/components/generic/button/BaseIconButton'
import BaseTable from '~/components/generic/table/BaseTable'
import BaseTableItem from '~/components/generic/table/BaseTableItem'
import MemberAddModal from './MemberAddModal'
import MemberEditModal from './MemberEditModal'

const header = ['Name', 'Faculty', 'Type', 'Role']

const MemberTable = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const dispatch = useDispatch()

  const selectedTeamId = useSelector(state => state.selectedTeamId)
  const {
    _id: teamId,
    members,
    administrator
  } = useSelector(state =>
    state.acceptedTeams.data.find(({ _id }) => _id === selectedTeamId)
  )

  const { data, loading } = useSelector(state => state.user)

  const handleEdit = m => {
    setSelectedMember(m)
    setOpenEditDialog(true)
  }

  const handleDelete = userId => {
    dispatch(deleteTeamMember({ userId, teamId }))
  }

  const setTeamDetail = () => {}

  return (
    <div>
      <h2 className="mt-3 text-xl font-medium">Research Member</h2>
      <BaseTable
        header={[...header, data?._id === administrator?._id && 'Action']}
        loading={loading}
      >
        <tr key={administrator?._id}>
          <BaseTableItem>{administrator?.fullName}</BaseTableItem>
          <BaseTableItem>{administrator?.faculty}</BaseTableItem>
          <BaseTableItem>{administrator?.accountType}</BaseTableItem>
          <BaseTableItem>Administrator</BaseTableItem>
        </tr>
        {members &&
          members.map(m => (
            <tr key={m._id}>
              <BaseTableItem>{m.fullName}</BaseTableItem>
              <BaseTableItem>{m.faculty}</BaseTableItem>
              <BaseTableItem>{m.accountType}</BaseTableItem>
              <BaseTableItem>Researcher</BaseTableItem>
              <BaseTableItem className="relative flex gap-2">
                <PencilAltIcon
                  className="h-6 w-6 text-gray-400 rounded-md hover:cursor-pointer hover:text-blue-700"
                  onClick={() => {}}
                />
                <TrashIcon
                  className="h-6 w-6 text-gray-400 rounded-md hover:cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(m._id)}
                />
              </BaseTableItem>
            </tr>
          ))}
      </BaseTable>
      {data?._id === administrator?._id && (
        <div className="flex mt-3 px-8 justify-end">
          <BaseIconButton onClick={() => setOpenAddDialog(true)}>
            <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
          </BaseIconButton>
        </div>
      )}
      <MemberAddModal
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        members={[...members, administrator].map(m => m?._id)}
        teamId={teamId}
        setTeamDetail={setTeamDetail}
      />
      <MemberEditModal
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        initialValues={selectedMember}
      />
    </div>
  )
}

export default MemberTable
