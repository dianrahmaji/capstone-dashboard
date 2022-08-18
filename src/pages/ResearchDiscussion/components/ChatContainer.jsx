import { useEffect, useRef } from 'react'

import ChatBubble from './ChatBubble'

const user1 = {
  _id: 1,
  fullName: 'Dian Rahmaji'
}

const user2 = {
  id: 2,
  fullName: 'Dzakiy Harissalam'
}

const ChatContainer = () => {
  const endMessage = useRef(null)

  useEffect(() => {
    endMessage.current?.scrollIntoView()
  })

  return (
    <div className="h-7/8 mx-auto w-full overflow-y-scroll px-4 sm:px-6 md:px-14">
      <div className="flex flex-col">
        {[...Array(110)].map((_, i) => (
          <ChatBubble key={i} user={user2} />
        ))}
        <ChatBubble user={user1} />
        <div ref={endMessage} />
      </div>
    </div>
  )
}

export default ChatContainer
