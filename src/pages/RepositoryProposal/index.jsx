import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlusSmIcon } from '@heroicons/react/outline'

import { createTeam } from '~/store/actions/teamActions'

import BaseIconButton from '~/components/generic/button/BaseIconButton'
import DashboardLayout from '~/layouts/DashboardLayout'
import ProposalModal from './components/ProposalModal'
import ProposalTable from './components/ProposalTable'

const RepositoryProlosal = () => {
  const [openDialog, setOpenDialog] = useState(false)

  const dispatch = useDispatch()

  const { data } = useSelector((state) => state.user)

  const handleSubmit = (values) => {
    dispatch(createTeam({ administrator: data?._id, ...values }))
    setOpenDialog(false)
  }

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Pengajuan Repository</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <ProposalTable />
          <ProposalModal
            title="Add Repository"
            open={openDialog}
            setOpen={setOpenDialog}
            handleSubmit={handleSubmit}
          />
          <div className="mt-3 flex justify-end px-8">
            <BaseIconButton onClick={() => setOpenDialog(true)}>
              <PlusSmIcon className="h-6 w-6" aria-hidden="true" />
            </BaseIconButton>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default RepositoryProlosal
