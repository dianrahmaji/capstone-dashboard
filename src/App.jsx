import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createAxios } from "~/api";
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
  const { data: acceptedTeams } = useSelector((state) => state.acceptedTeams);

  createAxios(token);

  useEffect(() => {
    if (token && acceptedTeams.length > 0) {
      dispatch(fetchNotifications(memberId, roomId));
    }
  });

  return (
    <Routes>
      {Object.entries(dashboard).map(([key, route]) => (
        <Route {...route} key={key} />
      ))}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
