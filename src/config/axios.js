import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

const user = localStorage.getItem('user-researcher')

if (user) {
  const { token } = JSON.parse(user)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
