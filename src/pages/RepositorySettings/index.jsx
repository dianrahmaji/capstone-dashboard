import DashboardLayout from '~/layouts/DashboardLayout'
import MemberTable from './components/MemberTable'
import RepositoryDetails from './components/RepositoryDetails'

const RepositorySettings = () => {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-lg font-medium text-gray-900">
            Pengaturan Repository
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <RepositoryDetails />
          <MemberTable />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default RepositorySettings
