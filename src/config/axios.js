import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default function createAxios(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}
