export default (client) => ({
  createFolder: (data) => client.post("/api/folder", data),
  fetchFolderById: ({ folderId }) => client.get(`/api/folder/${folderId}`),
});
