import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'

import BaseButton from '~/components/generic/button/BaseButton'
import { toLocaleFormat } from '~/utils/date'
import RepositoryEditModal from './RepositoryEditModal'

const RepositoryDetails = () => {
  const [openDialog, setOpenDialog] = useState(false)

  const detail = useSelector(({ selectedTeamId, acceptedTeams }) => {
    return acceptedTeams.data.find(({ _id }) => _id === selectedTeamId)
  })

  const { repository, ...rest } = detail

  repository.startDate = toLocaleFormat(repository?.startDate && new Date())
  repository.endDate = toLocaleFormat(repository?.endDate && new Date())

  const { data } = useSelector(state => state.user)

  return (
    <Fragment>
      <h1 className="mt-3 text-2xl font-semibold text-gray-900">
        {detail?.name}
      </h1>
      <div className="ml-4 my-6 flex flex-col">
        <div className="text-lg font-medium">Topic</div>
        {/* TODO: Add this field to db */}
        <div>Information System, Web Development, Knowledge Management</div>
        <div className="text-lg font-medium  mt-5">Time</div>
        <div>
          {detail?.repository?.startDate} - {detail?.repository?.endDate}
        </div>
        <div className="text-lg font-medium  mt-5">Description</div>
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
        initialValues={{ ...repository, ...rest }}
      />
    </Fragment>
  )
}

export default RepositoryDetails
