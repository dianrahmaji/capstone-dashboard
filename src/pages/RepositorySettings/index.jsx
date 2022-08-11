import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import DashboardLayout from '~/layouts/DashboardLayout'
import MemberTable from './components/MemberTable'
import RepositoryDetails from './components/RepositoryDetails'

const RepositorySettings = () => {
  const [teamDetail, setTeamDetail] = useState({})

  const {
    data: { selectedTeam }
  } = useSelector(state => state.acceptedTeams)

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const { data } = await axios.get(`/api/team/${selectedTeam._id}`)

        setTeamDetail(data)
      } catch (_) {}
    }
    console.log(selectedTeam)

    fetchTeamDetails()
  }, [selectedTeam])
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-lg font-medium text-gray-900">
            Pengaturan Repository
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <RepositoryDetails detail={teamDetail} />
          <MemberTable
            administrator={teamDetail.administrator}
            members={teamDetail.members}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default RepositorySettings
