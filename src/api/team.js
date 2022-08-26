export default (client) => ({
  createTeam: (data) => client.post("/api/team", data),
  updateTeam: ({ teamId }, data) => client.put(`/api/team/${teamId}`, data),
  deleteTeam: ({ teamId }) => client.delete(`/api/team/${teamId}`),
  addTeamMember: ({ teamId, researcherId, role }) =>
    client.post(`/api/team/${teamId}/member/${researcherId}?role=${role}`),
  updateTeamMember: ({ teamId, researcherId, role }) =>
    client.put(`/api/team/${teamId}/member/${researcherId}?role=${role}`),
  deleteTeamMember: ({ teamId, userId }) =>
    client.delete(`/api/team/${teamId}/member/${userId}`),
  updateAcceptedTeam: ({ teamId }, data) =>
    client.put(`/api/team/${teamId}`, data),
});
