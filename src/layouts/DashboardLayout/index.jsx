import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const {
    data: { token },
  } = useSelector((state) => state.user);
  const { data: acceptedTeams } = useSelector((state) => state.acceptedTeams);

  useEffect(() => {
    if (!token) navigate("/login");
    if (token && acceptedTeams.length === 0) navigate("/proposal");
  }, [token, navigate, acceptedTeams]);

  return (
    <div className="min-h-screen">
      <NavigationBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex h-screen w-screen flex-1 flex-col md:pl-64">
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
