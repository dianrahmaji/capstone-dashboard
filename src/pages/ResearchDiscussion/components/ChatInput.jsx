import { PaperClipIcon } from '@heroicons/react/outline'
import { PaperAirplaneIcon } from '@heroicons/react/solid'

import BaseIconButton from '~/components/generic/button/BaseIconButton'

const ChatInput = () => {
  return (
    <div className="pb-10 px-10 w-full">
      <div className="flex gap-2 align-center justify-end">
        <div className="mt-1 grow">
          <input
            type="text"
            name="name"
            id="name"
            className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 px-4 rounded-full"
            placeholder="Message"
          />
        </div>
        <BaseIconButton secondary>
          <PaperClipIcon className="h-6 w-6" aria-hidden="true" />
        </BaseIconButton>
        <BaseIconButton secondary>
          <PaperAirplaneIcon className="h-6 w-6 rotate-90" aria-hidden="true" />
        </BaseIconButton>
      </div>
    </div>
  )
}

export default ChatInput
