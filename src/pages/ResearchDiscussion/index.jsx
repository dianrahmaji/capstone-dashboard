import ChatContainer from './components/ChatContainer'
import ChatInput from './components/ChatInput'
import DashboardLayout from '~/layouts/DashboardLayout'
import DiscussionHeader from './components/DiscussionHeader'

const RepositoryDiscussion = () => {
  return (
    <DashboardLayout>
      <div className="py-6 relative grid grid-rows-[100px_1fr_50px] h-full overflow-x-hidden">
        <DiscussionHeader />
        <ChatContainer />
        <ChatInput />
      </div>
    </DashboardLayout>
  )
}

export default RepositoryDiscussion
