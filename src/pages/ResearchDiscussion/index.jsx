import { useEffect, useState } from 'react'

import ChatContainer from './components/ChatContainer'
import ChatInput from './components/ChatInput'
import DashboardLayout from '~/layouts/DashboardLayout'
import DiscussionHeader from './components/DiscussionHeader'
import TeamInfo from './components/TeamInfo'

const RepositoryDiscussion = () => {
  const [openInfo, setOpenInfo] = useState(false)

  return (
    <DashboardLayout>
      <div className="py-6 relative grid grid-rows-[100px_1fr_50px] h-full overflow-x-hidden">
        <DiscussionHeader setOpen={setOpenInfo} />
        <ChatContainer />
        <ChatInput />
        <TeamInfo open={openInfo} setOpen={setOpenInfo} />
      </div>
    </DashboardLayout>
  )
}

export default RepositoryDiscussion
