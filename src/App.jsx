import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import createAxios from './config/axios'
import dashboard from '~/config/dashboard'

import Login from '~/pages/Login'
import Register from '~/pages/Register'

const App = () => {
  const {
    data: { token }
  } = useSelector(state => state.user)

  createAxios(token)

  return (
    <Routes>
      {dashboard.map(({ route, navigation }) => (
        <Route {...route} key={navigation.name} />
      ))}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
