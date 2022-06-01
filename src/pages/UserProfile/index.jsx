import DashboardLayout from '~/layouts/DashboardLayout'
import DetailProfile from './components/DetailProfile'
import RepositoryHistory from './components/RepositoryHistory'

const UserProfile = () => {
  return (
    <DashboardLayout>
      <DetailProfile />
      <RepositoryHistory />
    </DashboardLayout>
  )
}

export default UserProfile
