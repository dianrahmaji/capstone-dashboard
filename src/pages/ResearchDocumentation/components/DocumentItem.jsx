import { Link } from 'react-router-dom'
import { DocumentTextIcon, FolderIcon } from '@heroicons/react/outline'

const DocumentItem = ({ type }) => {
  return (
    <Link
      to="#"
      className="flex flex-col justify-center items-center max-w-md focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
    >
      <div>
        {type === 'file' ? (
          <DocumentTextIcon className="h-24 w-24 stroke-1 text-primary" />
        ) : (
          <FolderIcon className="h-24 w-24 stroke-1 text-primary" />
        )}
      </div>
      <div className="text-center">Dian Rahmaji Dokumen</div>
    </Link>
  )
}

export default DocumentItem
