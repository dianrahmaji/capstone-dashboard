import { LogoutIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import dashboard from "~/config/dashboard";
import { selectTeam } from "~/store/actions/teamActions";

import BaseCombobox from "~/components/generic/form/BaseCombobox";
import NavigationBarItem from "./NavigationBarItem";

export default function NavigationList() {
  const [query, setQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState({});

  const dispatch = useDispatch();

  const selectedTeamId = useSelector((state) => state.selectedTeamId);
  const { data: acceptedTeams } = useSelector((state) => state.acceptedTeams);
  const { data: notification } = useSelector((state) => state.notification);
  const activeFolderId = useSelector((state) => state.activeFolderId);

  useEffect(() => {
    setSelectedTeam(acceptedTeams.find(({ _id }) => _id === selectedTeamId));
  }, [selectedTeamId, acceptedTeams]);

  const handleSelectTeam = (team) => {
    dispatch(selectTeam(team));
  };

  const filteredTeams =
    query === ""
      ? acceptedTeams
      : acceptedTeams.filter((team) =>
          team.name.toLowerCase().includes(query.toLowerCase()),
        );

  const handleLogout = () => {};

  return (
    <nav className="flex-1 space-y-1 px-2 pb-4">
      {acceptedTeams.length > 0 && (
        <BaseCombobox
          className="mb-4"
          value={selectedTeam}
          onChange={handleSelectTeam}
          filteredItem={filteredTeams}
          setQuery={setQuery}
        />
      )}
      {acceptedTeams.length > 0 ? (
        Object.values(dashboard).map((navigation) => {
          // eslint-disable-next-line no-nested-ternary
          return navigation.path === "/discussion" ? (
            <NavigationBarItem
              {...navigation}
              key={navigation.name}
              notification={notification}
            />
          ) : navigation.path === "/documentation/:folderId" ? (
            <NavigationBarItem
              {...navigation}
              path={`/documentation/${activeFolderId}`}
              key={navigation.name}
            />
          ) : (
            <NavigationBarItem {...navigation} key={navigation.name} />
          );
        })
      ) : (
        <>
          <NavigationBarItem {...dashboard.root} />
          <NavigationBarItem {...dashboard.proposal} />
          <NavigationBarItem {...dashboard.profile} />
        </>
      )}
      <div className="pt-3">
        <NavigationBarItem
          name="Keluar"
          path="#"
          icon={LogoutIcon}
          onLogout={handleLogout}
        />
      </div>
    </nav>
  );
}
