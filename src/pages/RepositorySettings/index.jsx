import useSelectedTeam from "~/hooks/useSelectedTeam";

import DashboardLayout from "~/layouts/DashboardLayout";
import Contributions from "./components/Contributions";
import MemberTable from "./components/MemberTable";
import RepositoryDetails from "./components/RepositoryDetails";

function RepositorySettings() {
  const team = useSelectedTeam();
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Pengaturan Project Penelitian
          </h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {team && (
            <>
              <RepositoryDetails />
              <MemberTable />
              <Contributions />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default RepositorySettings;
