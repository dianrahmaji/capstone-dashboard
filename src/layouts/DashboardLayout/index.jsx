import { useState } from 'react'

import NavigationBar from './components/NavigationBar'

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <NavigationBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="md:pl-64 flex flex-col flex-1 h-screen w-screen">
        <main className="h-full">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
