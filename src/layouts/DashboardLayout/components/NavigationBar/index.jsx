import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAcceptedTeams } from "~/store/actions/teamActions";

import NavigationBarDesktop from "./NavigationBarDesktop";
import NavigationBarMobile from "./NavigationBarMobile";

function NavigationBar({ sidebarOpen, setSidebarOpen }) {
  const dispatch = useDispatch();

  const { data: user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchAcceptedTeams(user._id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <NavigationBarMobile
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <NavigationBarDesktop />
    </div>
  );
}

export default NavigationBar;
