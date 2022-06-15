import { Link } from 'react-router-dom'
import * as ContextMenu from '@radix-ui/react-context-menu'
import {
  DocumentTextIcon,
  FolderIcon,
  PencilAltIcon,
  TrashIcon
} from '@heroicons/react/outline'

const DocumentItem = ({ type, onRename }) => {
  return (
    <Link
      to="#"
      className="max-w-md focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
    >
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div className="flex flex-col justify-center items-center ">
            {type === 'file' ? (
              <DocumentTextIcon className="h-24 w-24 stroke-1 text-primary" />
            ) : (
              <FolderIcon className="h-24 w-24 stroke-1 text-primary" />
            )}
          </div>
          <div className="text-center">Dian Rahmaji Dokumen</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content
          className="z-40 w-56 min-w-max py-1 rounded-md shadow-sm outline-none bg-white border border-gray-200 dark:bg-neutral-800 dark:border-gray-700"
          alignOffset={-5}
        >
          <ContextMenu.Item
            className="flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-700"
            onClick={() => onRename({ documentName: 'Dian Rahmaji Dokumen' })}
          >
            <PencilAltIcon className="h-6 w-6 mr-2" />
            <span className="flex-1 mr-2">Rename</span>
          </ContextMenu.Item>
          <ContextMenu.Item className="flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-700">
            <TrashIcon className="h-6 w-6 mr-2" />
            <span className="flex-1 mr-2">Delete</span>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
    </Link>
  )
}

export default DocumentItem
