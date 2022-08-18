import { Fragment, useState } from 'react'
import { DocumentAddIcon, FolderAddIcon } from '@heroicons/react/outline'

import DocumentModal from './DocumentModal'

const ActionContainer = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [fileType, setFileType] = useState('file')

  const handleCreate = (type) => {
    setFileType(type)
    setOpenDialog(true)
  }

  return (
    <Fragment>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pt-3 pb-4 sm:px-6 md:px-8">
        <div
          className="flex cursor-pointer items-center gap-2 rounded-md py-2 px-3 hover:bg-slate-200"
          onClick={() => handleCreate('folder')}
        >
          <FolderAddIcon className="h-6 w-6" /> New Folder
        </div>
        <div
          className="flex cursor-pointer items-center gap-2 rounded-md py-2 px-3 hover:bg-slate-200"
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
