import { Fragment, useState } from 'react'

import BaseButton from '~/components/generic/button/BaseButton'
import RepositoryEditModal from './RepositoryEditModal'

const research = {
  _id: 1,
  title: 'Capstone Project',
  topic: ['Information System', 'Web Development', 'Knowledge Management'],
  startDate: '2021-08-01',
  endDate: '2022-08-01',
  description: 'Best project ever',
  faculty: 'Engineering',
  approval: 'approved',
  status: 'active'
}

const RepositoryDetails = () => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Fragment>
      <h1 className="mt-3 text-2xl font-semibold text-gray-900">
        {research.title}
      </h1>
      <div className="ml-4 my-6 flex flex-col">
        <div className="text-lg font-medium">Topic</div>
        <div>{research.topic.reduce((prev, curr) => prev + ', ' + curr)}</div>
        <div className="text-lg font-medium  mt-5">Time</div>
        <div>
          {research.startDate} - {research.endDate}
        </div>
        <div className="text-lg font-medium  mt-5">Description</div>
        <div>{research.description}</div>
        <BaseButton className="ml-auto" onClick={() => setOpenDialog(true)}>
          Edit
        </BaseButton>
      </div>
      <RepositoryEditModal
        open={openDialog}
        setOpen={setOpenDialog}
        initialValues={research}
      />
    </Fragment>
  )
}

export default RepositoryDetails
