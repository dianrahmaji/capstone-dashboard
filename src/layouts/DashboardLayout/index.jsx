import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";

const whitelist = ["/", "/proposal", "/profile"];

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    data: { token },
  } = useSelector((state) => state.user);
  const { data: acceptedTeams } = useSelector((state) => state.acceptedTeams);

  useEffect(() => {
    if (!token) navigate("/login");
    if (token && acceptedTeams.length === 0 && !whitelist.includes(pathname))
      navigate("/");
  }, [token, navigate, pathname, acceptedTeams]);

  return (
    <div className="min-h-screen">
      <NavigationBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex h-screen w-screen flex-1 flex-col md:pl-64">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
