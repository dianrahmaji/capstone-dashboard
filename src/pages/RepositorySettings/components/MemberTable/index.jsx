import { useState } from 'react'
import { PencilAltIcon, PlusSmIcon, TrashIcon } from '@heroicons/react/outline'

import BaseIconButton from '~/components/generic/button/BaseIconButton'
import BaseTable from '~/components/generic/table/BaseTable'
import BaseTableItem from '~/components/generic/table/BaseTableItem'
import MemberAddModal from './MemberAddModal'
import MemberEditModal from './MemberEditModal'

const header = ['Name', 'Faculty', 'Type', 'Role', 'Action']
const members = [
  {
    _id: 1,
    fullName: 'Dian Rahmaji',
    faculty: 'Engineering',
    type: 'Student',
    role: 'backend'
  },
  {
    _id: 2,
    fullName: 'Dzakiy Harissalam',
    faculty: 'Engineering',
    type: 'Student',
    role: 'frontend'
  }
]

const MemberTable = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const handleEdit = m => {
    setSelectedMember(m)
    setOpenEditDialog(true)
  }
  return (
    <div>
      <h2 className="mt-3 text-xl font-medium">Research Member</h2>
      <BaseTable header={header}>
        {members &&
          members.map(m => (
            <tr key={m._id}>
              <BaseTableItem>{m.fullName}</BaseTableItem>
              <BaseTableItem>{m.faculty}</BaseTableItem>
              <BaseTableItem>{m.type}</BaseTableItem>
              <BaseTableItem>{m.role}</BaseTableItem>
              <BaseTableItem className="relative flex gap-2">
                <PencilAltIcon
                  className="h-6 w-6 text-gray-400 rounded-md hover:cursor-pointer hover:text-blue-700"
                  onClick={() => handleEdit(m)}
                />
                <TrashIcon
                  className="h-6 w-6 text-gray-400 rounded-md hover:cursor-pointer hover:text-red-700"
                  onClick={() => {}}
                />
              </BaseTableItem>
            </tr>
          ))}
      </BaseTable>
      <div className="flex mt-3 px-8 justify-end">
        <BaseIconButton onClick={() => setOpenAddDialog(true)}>
          <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
        </BaseIconButton>
      </div>
      <MemberAddModal open={openAddDialog} setOpen={setOpenAddDialog} />
      <MemberEditModal
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        initialValues={selectedMember}
      />
    </div>
  )
}

export default MemberTable
