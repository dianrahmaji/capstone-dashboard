import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAcceptedTeams } from '~/store/actions/teamActions'

import NavigationBarDesktop from './NavigationBarDesktop'
import NavigationBarMobile from './NavigationBarMobile'

const NavigationBar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch()

  const { data: user } = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      dispatch(fetchAcceptedTeams(user._id))
    }
  }, [dispatch, user])

  return (
    <Fragment>
      <div>
        <NavigationBarMobile
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <NavigationBarDesktop />
      </div>
    </Fragment>
  )
}

export default NavigationBar
