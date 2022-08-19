import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { PaperClipIcon } from '@heroicons/react/outline'
import { PaperAirplaneIcon } from '@heroicons/react/solid'

import BaseIconButton from '~/components/generic/button/BaseIconButton'

const ChatInput = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const {
    data: { _id: sender }
  } = useSelector((state) => state.user)
  const { chat: chatId } = useSelector(({ selectedTeamId, acceptedTeams }) => {
    return acceptedTeams.data.find(({ _id }) => _id === selectedTeamId)
  })

  const handleSubmit = async (e) => {
    if (e.key && !(e.key === 'Enter')) {
      return
    }
    setLoading(true)
    await axios.post(`/api/chat/${chatId}`, {
      sender,
      text: message
    })
    setMessage('')
    setLoading(false)
  }

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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleSubmit}
          />
        </div>
        <BaseIconButton secondary>
          <PaperClipIcon className="h-6 w-6" aria-hidden="true" />
        </BaseIconButton>
        <BaseIconButton secondary loading={loading} onClick={handleSubmit}>
          <PaperAirplaneIcon className="h-6 w-6 rotate-90" aria-hidden="true" />
        </BaseIconButton>
      </div>
    </div>
  )
}

export default ChatInput
