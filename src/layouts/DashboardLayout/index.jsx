import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import NavigationBar from './components/NavigationBar'

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const {
    data: { token }
  } = useSelector(state => state.user)

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token, navigate])

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
