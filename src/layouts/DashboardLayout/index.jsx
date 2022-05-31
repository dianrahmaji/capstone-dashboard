import { Fragment, useState } from 'react'

import Header from './components/Header'
import NavigationBar from './components/NavigationBar'

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Fragment>
      <NavigationBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="md:pl-64 flex flex-col flex-1">
        <Header setSidebarOpen={setSidebarOpen} />

        <main>{children}</main>
      </div>
    </Fragment>
  )
}

export default DashboardLayout
