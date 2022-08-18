import { useSelector } from 'react-redux'

import DashboardLayout from '~/layouts/DashboardLayout'
import MemberTable from './components/MemberTable'
import RepositoryDetails from './components/RepositoryDetails'

const RepositorySettings = () => {
  const teamDetail = useSelector(({ selectedTeamId, acceptedTeams }) => {
    return acceptedTeams.data.find(({ _id }) => _id === selectedTeamId)
  })

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-lg font-medium text-gray-900">Pengaturan Repository</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {teamDetail && (
            <>
              <RepositoryDetails />
              <MemberTable />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default RepositorySettings
