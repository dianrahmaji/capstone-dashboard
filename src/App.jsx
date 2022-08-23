import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import createAxios from "./config/axios";
import dashboard from "~/config/dashboard";

import { fetchNotifications } from "~/store/actions/notificationActions";

import Login from "~/pages/Login";
import Register from "~/pages/Register";

function App() {
  const dispatch = useDispatch();

  const {
    data: { _id: memberId, token },
  } = useSelector((state) => state.user);

  const {
    data: { roomId },
  } = useSelector((state) => state.chat);

  createAxios(token);

  useEffect(() => {
    if (token) {
      dispatch(fetchNotifications(memberId, roomId));
    }
  });

  return (
    <Routes>
      {dashboard.map(({ route, navigation }) => (
        <Route {...route} key={navigation.name} />
      ))}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
