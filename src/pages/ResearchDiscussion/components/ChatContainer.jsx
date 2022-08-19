import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import ChatBubble from './ChatBubble'

const ChatContainer = () => {
  const [allMessages, setAllMessages] = useState([])
  const endMessage = useRef(null)

  const { chat: chatId } = useSelector(({ selectedTeamId, acceptedTeams }) => {
    return acceptedTeams.data.find(({ _id }) => _id === selectedTeamId)
  })

  useEffect(() => {
    async function fetchAllMessages() {
      try {
        const { data } = await axios.get(`/api/chat/${chatId}`)
        console.log(data)
        setAllMessages(data)
      } catch (_) {}
    }

    fetchAllMessages()
  }, [])

  useEffect(() => {
    endMessage.current?.scrollIntoView()
  })

  return (
    <div className="h-7/8 mx-auto w-full overflow-y-scroll px-4 sm:px-6 md:px-14">
      <div className="flex flex-col">
        {allMessages.map((m) => (
          <ChatBubble key={m._id} message={m} />
        ))}
        <div ref={endMessage} />
      </div>
    </div>
  )
}

export default ChatContainer
