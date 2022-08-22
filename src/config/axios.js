import axios from "axios";

export default function createAxios(token) {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}
