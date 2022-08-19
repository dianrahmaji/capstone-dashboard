import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { toTimeOnlyFormat } from '~/utils/date'

const loggedInId = 1

const ChatBubble = ({ message }) => {
  const {
    data: { _id: userId }
  } = useSelector((data) => data.user)
  console.log(userId, message.sender._id)

  return (
    <div
      className={clsx('flex', {
        'justify-end': message.sender._id === userId
      })}
    >
      <div className="w-fit max-w-xl text-black">
        {message.sender._id !== userId && <p className="text-sm">{message.sender.fullName}</p>}
        <p
          className={clsx(' mb-3 rounded-xl p-4', {
            'bg-gray-200': message.sender._id !== userId,
            'bg-primary text-white': message.sender._id === userId
          })}
        >
          {message.text}
          <time dateTime={message.createdAt} className="mt-2 flex justify-end text-xs italic">
            {toTimeOnlyFormat(message.createdAt)}
          </time>
        </p>
      </div>
    </div>
  )
}

export default ChatBubble
