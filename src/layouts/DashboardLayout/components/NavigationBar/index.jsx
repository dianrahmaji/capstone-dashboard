import { Fragment } from 'react'

import NavigationBarDesktop from './NavigationBarDesktop'
import NavigationBarMobile from './NavigationBarMobile'

const NavigationBar = ({ sidebarOpen, setSidebarOpen }) => {
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
