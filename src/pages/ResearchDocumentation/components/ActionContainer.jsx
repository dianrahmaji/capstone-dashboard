import { Fragment, useState } from 'react'
import { DocumentAddIcon, FolderAddIcon } from '@heroicons/react/outline'

import DocumentModal from './DocumentModal'

const ActionContainer = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [fileType, setFileType] = useState('file')

  const handleCreate = type => {
    setFileType(type)
    setOpenDialog(true)
  }

  return (
    <Fragment>
      <div className="flex gap-3 max-w-7xl mx-auto px-4 pt-3 pb-4 sm:px-6 md:px-8 items-center">
        <div
          className="flex gap-2 cursor-pointer items-center hover:bg-slate-200 py-2 px-3 rounded-md"
          onClick={() => handleCreate('folder')}
        >
          <FolderAddIcon className="h-6 w-6" /> New Folder
        </div>
        <div
          className="flex gap-2 cursor-pointer items-center hover:bg-slate-200 py-2 px-3 rounded-md"
          onClick={() => handleCreate('file')}
        >
          <DocumentAddIcon className="h-6 w-6" /> New Document
        </div>
      </div>
      <DocumentModal
        type={fileType}
        action="create"
        open={openDialog}
        setOpen={setOpenDialog}
        initialValues="Document Name"
      />
    </Fragment>
  )
}

export default ActionContainer
