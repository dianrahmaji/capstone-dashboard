export default (client) => ({
  // FIXME: Should user and team endpoints put under teams?
  searchResearchers: (data) => client.get(`/api/user/search?param=${data}`),
  fetchAllTeams: ({ id }) => client.get(`/api/user/${id}/team?all=true`),
  fetchTeams: ({ id }) => client.get(`/api/user/${id}/team`),
  fetchAcceptedTeams: ({ id }) =>
    client.get(`/api/user/${id}/team?accepted=true`),
  login: (data) => client.post("/api/user/login", data),
  register: (data) => client.post("/api/user", data),
});
