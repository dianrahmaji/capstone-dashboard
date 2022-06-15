import { Fragment, useState } from 'react'
import DocumentItem from './DocumentItem'
import RenameModal from './RenameModal'

const DocumentContainer = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)

  const handleRename = d => {
    setSelectedDocument(d)
    setOpenDialog(true)
  }

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <DocumentItem type="file" onRename={handleRename} />
        <DocumentItem onRename={handleRename} />
      </div>
      <RenameModal
        open={openDialog}
        setOpen={setOpenDialog}
        initialValues={selectedDocument}
      />
    </Fragment>
  )
}

export default DocumentContainer
