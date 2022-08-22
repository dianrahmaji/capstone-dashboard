import { useSelector } from "react-redux";

const useSelectedTeam = () => {
  const team = useSelector(({ selectedTeamId, acceptedTeams }) =>
    acceptedTeams.data.find(({ _id }) => _id === selectedTeamId),
  );

  return team;
};

export default useSelectedTeam;
