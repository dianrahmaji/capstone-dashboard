import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutIcon } from '@heroicons/react/outline'
import dashboard from '~/config/dashboard'

import { selectTeam } from '~/store/actions/teamActions'

import BaseCombobox from '~/components/generic/form/BaseCombobox'
import NavigationBarItem from './NavigationBarItem'

const NavigationBarDesktop = () => {
  const [query, setQuery] = useState('')

  const dispatch = useDispatch()

  const {
    data: { selectedTeam, acceptedTeams }
  } = useSelector(state => state.acceptedTeams)

  const filteredTeams =
    query === ''
      ? acceptedTeams
      : acceptedTeams.filter(team => {
          return team.name.toLowerCase().includes(query.toLowerCase())
        })

  const handleSelectTeam = team => {
    dispatch(selectTeam(team))
  }

  const handleLogout = () => {
    console.log('logout')
  }

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-primary overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
            alt="Workflow"
          />
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            <BaseCombobox
              className="mb-4"
              value={selectedTeam}
              onChange={handleSelectTeam}
              filteredItem={filteredTeams}
              setQuery={setQuery}
            />
            {dashboard.map(({ navigation }) => (
              <NavigationBarItem {...navigation} key={navigation.name} />
            ))}
            <div className="pt-3">
              <NavigationBarItem
                name="Keluar"
                path="#"
                icon={LogoutIcon}
                onLogout={handleLogout}
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default NavigationBarDesktop
