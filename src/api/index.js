import axios from "axios";

import chat from "./chat";
import document from "./document";
import folder from "./folder";
import user from "./user";
import team from "./team";
import notification from "./notification";

function createAxios(token) {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  axios.defaults.headers.post["Content-Type"] = "application/json";

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

const chatApi = chat(axios);
const documentApi = document(axios);
const folderApi = folder(axios);
const userApi = user(axios);
const teamApi = team(axios);
const notificationApi = notification(axios);

export {
  createAxios,
  chatApi,
  documentApi,
  folderApi,
  userApi,
  teamApi,
  notificationApi,
};
