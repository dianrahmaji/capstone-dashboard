import { PaperClipIcon } from '@heroicons/react/outline'
import { PaperAirplaneIcon } from '@heroicons/react/solid'

import BaseIconButton from '~/components/generic/button/BaseIconButton'

const ChatInput = () => {
  return (
    <div className="w-full px-10 pb-10">
      <div className="align-center flex justify-end gap-2">
        <div className="mt-1 grow">
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
