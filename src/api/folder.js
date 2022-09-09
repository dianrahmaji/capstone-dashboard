export default (client) => ({
  createFolder: (data) => client.post("/api/folder", data),
  updateFolder: ({ folderId }, data) =>
    client.put(`/api/folder/${folderId}`, data),
  fetchFolderById: ({ folderId }) => client.get(`/api/folder/${folderId}`),
});
