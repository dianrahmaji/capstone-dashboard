// TODO: Add endpoints
export default (client) => ({
  createFolder: (data) => client.post("/api/folder", data),
});
